import { useAuthStore } from '@/services/databases/supabase/supabaseAuth';
import { useClipsStore } from '@/services/databases/supabase/supabaseClips';
import { Filter } from '@/shared/types';
import React, { useCallback, useEffect, useMemo } from 'react';

export const useTimelineEventsLogic = () => {
  const { userid } = useAuthStore();
  const { clips, uploading, getUserClips } = useClipsStore();
  const [activeFilter, setActiveFilter] = React.useState<Filter>('All');

  const fetchData = useCallback(async () => {
    if (!userid) return;
    console.log("[TimelineLogic] Fetching all clips from DB...");
    await getUserClips(userid);
  }, [userid, getUserClips]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredEvents = useMemo(() => {
    if (activeFilter === 'All') return clips;

    const now = new Date();
    const cutoff = new Date();

    if (activeFilter === 'Today') {
      cutoff.setDate(now.getDate() - 1);
    } else if (activeFilter === 'Week') {
      cutoff.setDate(now.getDate() - 7);
    } else if (activeFilter === 'Month') {
      cutoff.setMonth(now.getMonth() - 1);
    }

    return clips.filter(clip => new Date(clip.recorded_at) >= cutoff);
  }, [clips, activeFilter]);

  return {
    activeFilter,
    setActiveFilter,
    events: filteredEvents,
    loading: uploading,
    refreshEvents: fetchData,
  };
};