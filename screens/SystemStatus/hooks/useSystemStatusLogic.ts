import { useEffect, useState } from 'react';
import { PiNetworkService } from '@/services/hardware/http/piNetworkService';
import { useSemanticModels } from '@/services/edge_ai/semantic_trigger/useSemanticModels';
import { useSpeechToText, models } from 'react-native-executorch';

export const useSystemStatusLogic = () => {
  const [vqaAlive, setVqaAlive] = useState<boolean>(false);
  const [piAlive, setPiAlive] = useState<boolean>(false);
  const [isCheckingVqa, setIsCheckingVqa] = useState(true);
  const [isCheckingPi, setIsCheckingPi] = useState(true);

  // Load models to check ready state
  const semanticModels = useSemanticModels();
  const sttModel = useSpeechToText({
    model: models.speech_to_text.whisper_tiny_en(),
  });

  useEffect(() => {
    let mounted = true;
    const checkStatus = async () => {
      // Check VQA
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        const res = await fetch('https://em-eqa-vqa-service.onrender.com/', { signal: controller.signal });
        clearTimeout(timeoutId);
        if (mounted) {
           setVqaAlive(true);
           setIsCheckingVqa(false);
        }
      } catch (err) {
        if (mounted) {
           setVqaAlive(false);
           setIsCheckingVqa(false);
        }
      }

      // Check Pi
      try {
        const pAlive = await PiNetworkService.ping();
        if (mounted) {
          setPiAlive(pAlive);
          setIsCheckingPi(false);
        }
      } catch (err) {
        if (mounted) {
          setPiAlive(false);
          setIsCheckingPi(false);
        }
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 5000); // Check every 5 seconds

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return {
    clipReady: semanticModels.isReady,
    ttsReady: sttModel.isReady,
    vqaAlive,
    piAlive,
    isCheckingVqa,
    isCheckingPi
  };
};
