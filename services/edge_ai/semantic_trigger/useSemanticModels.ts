import { useImageEmbeddings, useTextEmbeddings, CLIP_VIT_BASE_PATCH32_IMAGE_QUANTIZED, CLIP_VIT_BASE_PATCH32_TEXT } from 'react-native-executorch';

export function useSemanticModels() {
  const imageModel = useImageEmbeddings({
    model: CLIP_VIT_BASE_PATCH32_IMAGE_QUANTIZED
  });
  
  const textModel = useTextEmbeddings({ 
    model: CLIP_VIT_BASE_PATCH32_TEXT 
  });

  return {
    imageModel,
    textModel,
    isReady: imageModel.isReady && textModel.isReady,
    error: imageModel.error || textModel.error,
  };
}
