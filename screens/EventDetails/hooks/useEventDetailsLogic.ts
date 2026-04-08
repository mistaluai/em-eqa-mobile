import { useRoute } from '@react-navigation/native';
import { EvidenceType } from '@/shared/types/evidence';

/**
 * Custom hook for EventDetailsScreen logic
 * Handles event deletion and navigation
 */
export const useEventDetailsLogic = () => {
  const route = useRoute();
  const evidence = (route.params as any)?.evidence as EvidenceType | null;

  const handleDelete = () => {
    console.log('Delete clip action triggered');
  };

  return {
    handleDelete,
    evidence,
  };
};

