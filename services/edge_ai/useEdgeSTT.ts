import { useEffect, useRef, useState } from 'react';
import { AudioManager, AudioRecorder } from 'react-native-audio-api';
import { models, useSpeechToText } from 'react-native-executorch';

interface UseEdgeSTTOptions {
  onTranscriptUpdate: (text: string) => void;
}

export const useEdgeSTT = ({ onTranscriptUpdate }: UseEdgeSTTOptions) => {
  const [isRecording, setIsRecording] = useState(false);
  const isRecordingRef = useRef(false);

  const model = useSpeechToText({
    model: models.speech_to_text.whisper_tiny_en(),
    vad: models.vad.fsmn_vad(),
  });

  const [recorder] = useState(() => new AudioRecorder());

  useEffect(() => {
    AudioManager.setAudioSessionOptions({
      iosCategory: 'playAndRecord',
      iosMode: 'spokenAudio',
      iosOptions: ['defaultToSpeaker'],
    });
    AudioManager.requestRecordingPermissions();
  }, []);

  const startRecording = async () => {
    if (!model.isReady || model.isGenerating) return;

    isRecordingRef.current = true;
    setIsRecording(true);
    onTranscriptUpdate(""); // Reset transcript on new recording

    recorder.onAudioReady(
      { sampleRate: 16000, bufferLength: 1600, channelCount: 1 },
      (chunk) => {
        if (isRecordingRef.current) {
          model.streamInsert(chunk.buffer.getChannelData(0));
        }
      }
    );

    await recorder.start();

    try {
      let finalizedText = '';
      const streamIter = model.stream({
        verbose: false,
        useVAD: true,
        vadDetectionMargin: 500,
      });

      for await (const { committed, nonCommitted } of streamIter) {
        if (!isRecordingRef.current) break;

        if (committed.text) finalizedText += committed.text;
        onTranscriptUpdate(finalizedText + (nonCommitted.text || ''));
      }
    } catch (error) {
      console.error('STT Streaming error:', error);
      stopRecording();
    }
  };

  const stopRecording = () => {
    isRecordingRef.current = false;
    setIsRecording(false);
    recorder.stop();
    model.streamStop();
  };

  return {
    isRecording,
    isReady: model.isReady,
    isGenerating: model.isGenerating,
    downloadProgress: model.downloadProgress,
    startRecording,
    stopRecording,
  };
};
