import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppModal from '../../../components/ModalComponent';
import { COLORS } from '../../../theme/colors';
import { TriggerSelectionModalStyles } from '../../../theme/styles/ProfileSettingsScreen/TriggerSelectionModalStyle';
import { TYPOGRAPHY } from '../../../theme';

const { width } = Dimensions.get('window');

interface TriggerSelectionModalProps {
  isVisible: boolean;
  onClose: () => void;
  availableTriggers: string[];
  selectedTriggers: string[];
  onToggleTrigger: (trigger: string) => void;
}

export const TriggerSelectionModal: React.FC<TriggerSelectionModalProps> = ({
  isVisible,
  onClose,
  availableTriggers,
  selectedTriggers,
  onToggleTrigger,
}) => (
  <AppModal isVisible={isVisible} onClose={onClose} modalWidth={width * 0.85}>
    <View style={TriggerSelectionModalStyles.modalContent}>
      <Text style={[TYPOGRAPHY.HeadlineM, TriggerSelectionModalStyles.modalTitle]}>Select Recording Triggers</Text>
      <ScrollView style={TriggerSelectionModalStyles.triggerList}>
        {availableTriggers.map((trigger, index) => (
          <Pressable
            key={index}
            onPress={() => onToggleTrigger(trigger)}
            style={TriggerSelectionModalStyles.triggerItem}
          >
            <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.textPrimary }]}>{trigger}</Text>
            <View style={[
              TriggerSelectionModalStyles.checkbox,
              selectedTriggers.includes(trigger) && TriggerSelectionModalStyles.checkboxSelected
            ]}>
              {selectedTriggers.includes(trigger) && (
                <Ionicons name="checkmark" size={16} color={COLORS.textPrimary} />
              )}
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <AppButton title="Done" onPress={onClose} />
    </View>
  </AppModal>
);