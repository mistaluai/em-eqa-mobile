import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { SPACING } from '../../spacing';

export const SearchDrawerStyles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  } as ViewStyle,
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  } as ViewStyle,
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: 20,
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginRight: 10,
  } as ViewStyle,
  searchBarInput: {
    flex: 1,
    color: COLORS.textPrimary,
    padding: 0,
    borderColor: COLORS.borderLight,
  } as TextStyle,
  searchIconPlaceholder: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  searchIconText: {
    fontSize: 18,
  } as TextStyle,
  newChatText: {
    color: COLORS.primary,
    fontWeight: '600',
  } as TextStyle,
  chatHistoryTitle: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  } as TextStyle,
  chatHistoryList: {
    flex: 1,
  } as ViewStyle,
  chatItem: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  } as ViewStyle,
  chatItemText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    borderColor: COLORS.borderLight,
    borderWidth: 2,
    borderRadius: 12,
    padding: 8,
  } as TextStyle,
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 0.5,
    borderTopColor: COLORS.backgroundNeutral,
  } as ViewStyle,
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    marginRight: 10,
  } as ViewStyle,
  userName: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '500',
  } as TextStyle,
  safeAreaContent: {
    flex: 1,
  } as ViewStyle,
  drawerPressable: {
    flex: 1,
  } as ViewStyle,
});
