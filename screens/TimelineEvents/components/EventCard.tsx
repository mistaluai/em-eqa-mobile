import { useThemeStyles } from "@/theme/useThemeStyles";
import { useThemeColor } from "@/theme/useThemeColor";
import { RADIUS, SPACING } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useClipsStore } from '../../../services/databases/supabase/supabaseClips';

// 1. Define the Prop Type based on your Supabase Schema
interface ClipData {
  id?: string;
  title?: string | null;
  summary?: string | null;
  recorded_at: string; // ISO String
  video_url: string;
}

interface EventCardProps {
  clip: ClipData; // Changed from 'event' to 'clip' to be clear
  isLast: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ clip, isLast }) => {
  const styles = useThemeStyles(createStyles);
  const COLORS = useThemeColor();
  const navigation = useNavigation<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [isDeletingLocal, setIsDeletingLocal] = useState(false);
  const deleteClip = useClipsStore((state) => state.deleteClip);

  const player = useVideoPlayer(clip.video_url || null, player => {
    player.loop = true;
  });

  const handleDelete = () => {
    if (!clip.video_url) return;

    Alert.alert(
      "Delete Video",
      "Are you sure you want to delete this video? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            setIsDeletingLocal(true);
            try {
              await deleteClip(clip.id, clip.video_url);
              setModalVisible(false);
            } catch (e) {
              Alert.alert("Error", "Failed to delete video.");
            } finally {
              setIsDeletingLocal(false);
            }
          }
        }
      ]
    );
  };

  // 2. Helper to extract time from ISO string (e.g. "2023-10-01T14:30:00" -> "14:30")
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.rowContainer}>
      {/* 1. LEFT TIMELINE COLUMN */}
      <View style={styles.timelineColumn}>
        {/* Prominent Time calculated from recorded_at */}
        <Text style={styles.timeText}>{formatTime(clip.recorded_at)}</Text>

        {!isLast && <View style={styles.timelineLine} />}
        <View style={styles.timelineDot} />
      </View>

      {/* 2. RIGHT CONTENT CARD */}
      <Pressable
        onPress={() => {
          if (clip.video_url) {
            setModalVisible(true);
            player.play();
          }
        }}
        style={({ pressed }) => [
          styles.cardContainer,
          pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] }
        ]}
      >
        {/* Hero Media Section */}
        {clip.video_url ? (
          <VideoView 
            player={player} 
            style={[styles.heroMediaContainer, { height: 160 }]} 
            nativeControls={false}
            contentFit="cover"
          />
        ) : (
          <View style={[styles.heroMediaContainer, { height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee' }]}>
            <Ionicons name="videocam-off-outline" size={24} color="#999" />
          </View>
        )}

        {/* Content Section */}
        <View style={styles.contentPadding}>
          {/* Handle cases where Title/Summary are still generating */}
          <Text style={styles.eventTitle} numberOfLines={2}>
            {clip.title || "Processing Title..."}
          </Text>
          <Text style={styles.eventSummary} numberOfLines={3}>
            {clip.summary || "AI is generating your summary..."}
          </Text>
        </View>
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => {
          player.pause();
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, backgroundColor: COLORS.backgroundLight }}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => { player.pause(); setModalVisible(false); }} style={styles.closeButton}>
              <Ionicons name="chevron-down" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: SPACING.s32 }}>
            {/* Edge-to-edge Video Player */}
            <View style={styles.modalVideoContainer}>
              <VideoView
                style={styles.modalVideo}
                player={player}
                allowsFullscreen={true}
                nativeControls={true}
              />
            </View>

            {/* Content Area */}
            <View style={styles.modalInfoContainer}>
              <Text style={styles.modalTitle}>
                {clip.title || "Video Clip"}
              </Text>
              
              <View style={styles.modalMetaRow}>
                <View style={[styles.modalMetaBadge, { backgroundColor: COLORS.borderLight }]}>
                  <Ionicons name="videocam-outline" size={14} color={COLORS.primary} />
                  <Text style={[styles.modalMetaText, { color: COLORS.primary }]}>Captured</Text>
                </View>
                <View style={styles.modalMetaDot} />
                <Text style={styles.modalTimeText}>{formatTime(clip.recorded_at)}</Text>
              </View>

              <Text style={styles.modalSectionTitle}>Summary</Text>
              <Text style={styles.modalDescription}>
                {clip.summary || "AI is generating a summary for this video..."}
              </Text>

              {/* Actions Area */}
              <View style={styles.modalActionsContainer}>
                <TouchableOpacity 
                  style={[styles.deleteButton, isDeletingLocal && { opacity: 0.7 }]}
                  onPress={handleDelete}
                  disabled={isDeletingLocal}
                  activeOpacity={0.8}
                >
                  {isDeletingLocal ? (
                    <ActivityIndicator size="small" color="#EF4444" />
                  ) : (
                    <>
                      <Ionicons name="trash-outline" size={20} color="#EF4444" />
                      <Text style={styles.deleteButtonText}>Delete Video</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  // Main Row Layout
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 0, // Handled by the content inside
    minHeight: 100,
  },

  // --- Timeline Column (Left) ---
  timelineColumn: {
    width: 60,
    alignItems: 'center',
    paddingTop: 0,
    marginRight: SPACING.s12,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.s8,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary, // UltraViolet Node
    borderWidth: 2,
    borderColor: COLORS.backgroundLight, // White border to separate from line
    zIndex: 2,
    marginTop: 4, // Align visually with the card title top
  },
  timelineLine: {
    position: 'absolute',
    top: 24, // Start slightly below the time text
    bottom: -10, // Extend to next item
    width: 2,
    backgroundColor: COLORS.borderLight, // Subtle connection line
    zIndex: 1,
  },

  // --- Content Card (Right) ---
  cardContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.large,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginBottom: SPACING.s24,
    overflow: 'hidden', // Ensures hero image respects corners
    // Optional: Add subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  // Hero Image
  heroMediaContainer: {
    width: '100%',
    height: 120, // Cinematic aspect ratio
    backgroundColor: COLORS.textSecondary, // Placeholder dark grey
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: SPACING.s8,
    right: SPACING.s8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: SPACING.s8,
    paddingVertical: 2,
    borderRadius: RADIUS.default,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },

  // Text Content
  contentPadding: {
    padding: SPACING.s16,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.s4,
  },
  eventSummary: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },

  // --- Modal Styles ---
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: SPACING.s16,
    paddingVertical: SPACING.s16,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.borderLight, // Subtle background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalVideoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    marginBottom: SPACING.s24,
  },
  modalVideo: {
    flex: 1,
  },
  modalInfoContainer: {
    paddingHorizontal: SPACING.s24,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: SPACING.s12,
    lineHeight: 32,
  },
  modalMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.s24,
  },
  modalMetaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.s8,
    paddingVertical: 4,
    borderRadius: RADIUS.default,
  },
  modalMetaText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  modalMetaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#94A3B8',
    marginHorizontal: SPACING.s12,
  },
  modalTimeText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.s8,
  },
  modalDescription: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: SPACING.s32,
  },
  modalActionsContainer: {
    marginTop: SPACING.s16,
    paddingTop: SPACING.s24,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2', // Light red
    paddingVertical: SPACING.s16,
    borderRadius: RADIUS.large,
    borderWidth: 1,
    borderColor: '#FECACA', // Red border
  },
  deleteButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: SPACING.s8,
  },
});