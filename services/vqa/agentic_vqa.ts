import EventSource from 'react-native-sse';
import { EvidenceType } from '../../shared/types/evidence';

export interface ChatHistoryPayload {
    role: string;
    content: string;
}

export interface StreamCallbacks {
    onStatus: (status: string) => void;
    onContent: (chunk: string) => void;
    onEvidence: (evidence: EvidenceType) => void;
    onError: (error: string) => void;
    onDone: (fullContent: string, finalEvidence?: EvidenceType) => void;
}

const API_URL = 'http://192.168.1.24:8080/api/v1/chat/query';

/**
 * Streams the agent response from the episodic memory pipeline.
 * Returns a cleanup function — call it on component unmount to close the stream.
 *
 * @example
 * useEffect(() => {
 *   const cleanup = streamAgentResponse(userId, question, history, callbacks);
 *   return cleanup;
 * }, []);
 */
export const streamAgentResponse = (
    userId: string,
    question: string,
    history: ChatHistoryPayload[],
    callbacks: StreamCallbacks
): (() => void) => {
    let fullContent = '';
    let finalEvidence: EvidenceType | undefined = undefined;
    let isDone = false;

    // Guard to ensure onDone and onError are only called once,
    // regardless of which terminal event fires first.
    const terminate = (isError: boolean, errorMsg?: string) => {
        if (isDone) return;
        isDone = true;
        es.close();
        if (isError && errorMsg) {
            callbacks.onError(errorMsg);
        }
        callbacks.onDone(fullContent, finalEvidence);
    };

    const es = new EventSource(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream',
        },
        body: JSON.stringify({
            user_id: userId,
            question: question,
            history: history,
        }),
        // Disable automatic reconnection — this is a POST-based stream with a
        // specific payload. A reconnect would re-run the entire pipeline.
        pollingInterval: 0, // 0 disables automatic reconnection
    });

    // 1. Handle status updates
    es.addEventListener('status' as any, (event: any) => {
        if (event.data) {
            const parsed = JSON.parse(event.data);
            callbacks.onStatus(parsed.text);
        }
    });

    // 2. Handle evidence selection
    es.addEventListener('evidence' as any, (event: any) => {
        if (event.data) {
            const parsed = JSON.parse(event.data);
            // Last evidence event wins (only one fires per pipeline run in practice)
            finalEvidence = parsed;
            callbacks.onEvidence(parsed);
        }
    });

    // 3. Handle text generation stream
    es.addEventListener('content' as any, (event: any) => {
        if (event.data) {
            const parsed = JSON.parse(event.data);
            fullContent += parsed.text;
            callbacks.onContent(parsed.text);
        }
    });

    // 4. Handle application-level errors emitted by the backend pipeline.
    //    These arrive as `event: error` with a JSON payload.
    //    Distinguished from native SSE connection errors which have no event.data.
    es.addEventListener('error' as any, (event: any) => {
        if (event.data) {
            // Backend emitted a structured error mid-stream
            try {
                const parsed = JSON.parse(event.data);
                terminate(true, parsed.text ?? 'An unknown agent error occurred.');
            } catch {
                terminate(true, 'Received a malformed error from the agent.');
            }
        }
        // else: native transport/connection error — no data, not a pipeline error.
        // react-native-sse will handle this; reconnectOnError:false means it won't retry.
    });

    // 5. Handle normal stream completion (backend emits `event: close` at end of pipeline)
    es.addEventListener('close' as any, (event: any) => {
        terminate(false);
    });

    // Return cleanup function for use in useEffect or manual teardown
    return () => {
        terminate(false);
    };
};