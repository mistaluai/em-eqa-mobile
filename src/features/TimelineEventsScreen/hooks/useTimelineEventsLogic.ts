import { useClipsStore } from '@/src/services/userdata/supabaseClips';
import React, { useCallback, useEffect } from 'react';
import { useAuthStore } from '../../../services/auth/supabaseAuth'; // Update path if needed
import { Filter } from '../../../shared/types';

export const useTimelineEventsLogic = () => {
  const { userid } = useAuthStore();
  const { clips, uploading, getUserClips, getClipsByDate } = useClipsStore();

  // DEBUG: Start with 'All' so you see data even if it's older than 24h
  const [activeFilter, setActiveFilter] = React.useState<Filter>('All');

  // 1. Central Fetch Function
  const fetchData = useCallback(async () => {
    console.log(`[TimelineLogic] 1. Fetch requested. UserID: ${userid ? userid.slice(0, 8) + '...' : 'None'} | Filter: ${activeFilter}`);

    if (!userid) {
      console.log("[TimelineLogic] 2. Abort: No UserID available yet.");
      return;
    }

    let result = [];
    try {
      if (activeFilter === 'Today') {
        console.log("[TimelineLogic] 3. Fetching clips for 'day'...");
        result = await getClipsByDate(userid, 'day');
      } else if (activeFilter === 'Week') {
        console.log("[TimelineLogic] 3. Fetching clips for 'week'...");
        result = await getClipsByDate(userid, 'week');
      } else {
        console.log("[TimelineLogic] 3. Fetching 'All' clips...");
        result = await getUserClips(userid);
      }

      console.log(`[TimelineLogic] 4. Success! Supabase returned ${result?.length || 0} clips.`);

    } catch (error) {
      console.error("[TimelineLogic] 4. Error fetching clips:", error);
    }
  }, [userid, activeFilter]);

  // 2. Automatically fetch when Filter or User changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    activeFilter,
    setActiveFilter,
    events: clips, // Expose the raw Supabase clips
    loading: uploading,
    refreshEvents: fetchData, // Expose refresh function for Pull-to-Refresh
  };
};