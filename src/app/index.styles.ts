import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  innerContent: {
    flex: 1,
    paddingHorizontal: 24,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
  },
  textDark: {
    color: '#F9FAFB',
  },
  subtitleDark: {
    color: '#9CA3AF',
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  emojiButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
      },
    }),
  },
  emojiButtonPressed: {
    transform: [{ scale: 0.92 }],
    opacity: 0.85,
  },
  emojiButtonText: {
    fontSize: 26,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '400',
  },
  mostFrequentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  mostFrequentEmojiText: {
    fontSize: 18,
  },
  listContent: {
    paddingBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  historyItemDark: {
    borderBottomColor: '#27272A',
  },
  historyItemPressed: {
    opacity: 0.6,
  },
  historyItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  emojiBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiBadgeText: {
    fontSize: 18,
  },
  historyDateText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1F2937',
  },
  trashBtn: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trashWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 8,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#374151',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  footerContainer: {
    paddingTop: 12,
    paddingBottom: 20,
  },
  clearButton: {
    borderWidth: 1,
    borderColor: '#FCA5A5',
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonDark: {
    borderColor: '#7F1D1D',
    backgroundColor: '#271212',
  },
  clearButtonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  clearButtonText: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '600',
  },
  clearButtonTextDark: {
    color: '#F87171',
  },
});
