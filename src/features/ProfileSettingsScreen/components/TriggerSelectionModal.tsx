import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppModal from '../../../components/ModalComponent';
import { COLORS } from '../../../theme/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '../../../theme/styles';

const { width, height } = Dimensions.get('window');

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
    <View style={styles.modalContent}>
      <Text style={[TYPOGRAPHY.HeadlineM, styles.modalTitle]}>Select Recording Triggers</Text>
      <ScrollView style={styles.triggerList}>
        {availableTriggers.map((trigger, index) => (
          <Pressable
            key={index}
            onPress={() => onToggleTrigger(trigger)}
            style={styles.triggerItem}
          >
            <Text style={[TYPOGRAPHY.BodyM, { color: COLORS.white }]}>{trigger}</Text>
            <View style={[
              styles.checkbox,
              selectedTriggers.includes(trigger) && styles.checkboxSelected
            ]}>
              {selectedTriggers.includes(trigger) && (
                <Ionicons name="checkmark" size={16} color={COLORS.white} />
              )}
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <AppButton title="Done" onPress={onClose} />
    </View>
  </AppModal>
);

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: COLORS.carbonBlack,
    borderRadius: RADIUS.large,
    padding: SPACING.s24,
  },
  modalTitle: {
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.s24,
    fontWeight: '700',
  },
  triggerList: {
    maxHeight: height * 0.5,
    marginBottom: SPACING.s24,
  },
  triggerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.s12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.gray700,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: RADIUS.full,
    borderWidth: 2,
    borderColor: COLORS.softGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLORS.ultraViolet,
    borderColor: COLORS.ultraViolet,
  },
});

