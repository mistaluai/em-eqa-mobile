import { streamAgentResponse } from '@/services/vqa/agentic_vqa';
import { EvidenceType } from '@/shared/types/evidence'; // Adjust path as needed
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export const StreamTester = () => {
    const [userId, setUserId] = useState('8dxxx01d');
    const [question, setQuestion] = useState('What were i doing on the packet tracer?');

    // Stream states
    const [isStreaming, setIsStreaming] = useState(false);
    const [statusText, setStatusText] = useState<string | null>(null);
    const [content, setContent] = useState('');
    const [evidence, setEvidence] = useState<EvidenceType | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Store the abort function to allow manual cancellation
    const abortStreamRef = useRef<(() => void) | null>(null);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (abortStreamRef.current) {
                abortStreamRef.current();
            }
        };
    }, []);

    const handleStartStream = () => {
        // Reset UI
        setContent('');
        setEvidence(null);
        setErrorMsg(null);
        setStatusText('Connecting...');
        setIsStreaming(true);

        abortStreamRef.current = streamAgentResponse(
            userId,
            question,
            [], // Empty history for testing
            {
                onStatus: (status) => {
                    setStatusText(status);
                },
                onEvidence: (ev) => {
                    setEvidence(ev);
                },
                onContent: (chunk) => {
                    setStatusText(null); // Clear status once typing begins
                    setContent((prev) => prev + chunk);
                },
                onError: (err) => {
                    setErrorMsg(err);
                    setIsStreaming(false);
                },
                onDone: (fullContent, finalEvidence) => {
                    setStatusText('Stream Complete.');
                    setIsStreaming(false);
                    abortStreamRef.current = null;
                    console.log('Final Content Length:', fullContent.length);
                }
            }
        );
    };

    const handleStopStream = () => {
        if (abortStreamRef.current) {
            abortStreamRef.current();
            abortStreamRef.current = null;
            setIsStreaming(false);
            setStatusText('Manually aborted.');
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>EM-EQA Stream Tester</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>User ID:</Text>
                <TextInput
                    style={styles.input}
                    value={userId}
                    onChangeText={setUserId}
                    placeholder="Enter UUID"
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Question:</Text>
                <TextInput
                    style={styles.input}
                    value={question}
                    onChangeText={setQuestion}
                    placeholder="Ask the agent..."
                />
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={[styles.button, isStreaming && styles.buttonDisabled]}
                    onPress={handleStartStream}
                    disabled={isStreaming}
                >
                    <Text style={styles.buttonText}>Start Stream</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.stopButton, !isStreaming && styles.buttonDisabled]}
                    onPress={handleStopStream}
                    disabled={!isStreaming}
                >
                    <Text style={styles.buttonText}>Stop</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.console}>
                <View style={styles.statusRow}>
                    {isStreaming && <ActivityIndicator size="small" color="#00ff00" />}
                    <Text style={styles.statusText}>
                        {statusText || (isStreaming ? 'Receiving data...' : 'Ready.')}
                    </Text>
                </View>

                {errorMsg && (
                    <Text style={styles.errorText}>Error: {errorMsg}</Text>
                )}

                {evidence && (
                    <View style={styles.evidenceCard}>
                        <Text style={styles.evidenceTitle}>📎 Evidence Selected:</Text>
                        <Text style={styles.evidenceText}>{evidence.title}</Text>
                        <Text style={styles.evidenceText}>Recorded: {evidence.timestamp.toString()}</Text>
                        <Text style={styles.evidenceText} numberOfLines={1}>URL: {evidence.video_url}</Text>
                    </View>
                )}

                <Text style={styles.outputText}>
                    {content || (isStreaming ? '' : 'No content generated yet.')}
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        color: '#aaaaaa',
        marginBottom: 5,
        fontSize: 14,
    },
    input: {
        backgroundColor: '#1e1e1e',
        color: '#ffffff',
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 10,
    },
    button: {
        flex: 1,
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 10,
    },
    stopButton: {
        backgroundColor: '#dc3545',
        marginRight: 0,
        marginLeft: 10,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    console: {
        backgroundColor: '#000000',
        borderRadius: 8,
        padding: 15,
        minHeight: 300,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    statusText: {
        color: '#00ff00',
        fontFamily: 'Courier',
        marginLeft: 8,
    },
    errorText: {
        color: '#ff4444',
        fontFamily: 'Courier',
        marginBottom: 10,
    },
    evidenceCard: {
        backgroundColor: '#1e1e1e',
        borderLeftWidth: 4,
        borderLeftColor: '#f39c12',
        padding: 10,
        marginBottom: 15,
        borderRadius: 4,
    },
    evidenceTitle: {
        color: '#f39c12',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    evidenceText: {
        color: '#cccccc',
        fontSize: 12,
        marginBottom: 2,
    },
    outputText: {
        color: '#ffffff',
        fontFamily: 'Courier',
        lineHeight: 20,
    },
});