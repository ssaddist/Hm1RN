import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
  Platform,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from './index.styles';

interface MoodOption {
  id: string;
  emoji: string;
  label: string;
  color: string;
  bgLight: string;
  borderLight: string;
  bgDark: string;
  borderDark: string;
}

const MOOD_OPTIONS: MoodOption[] = [
  {
    id: 'angry',
    emoji: 'angry',
    label: 'Злість',
    color: '#EF4444',
    bgLight: '#FEE2E2',
    borderLight: '#FCA5A5',
    bgDark: '#451A1A',
    borderDark: '#7F1D1D',
  },
  {
    id: 'sad',
    emoji: 'frown',
    label: 'Сум',
    color: '#F97316',
    bgLight: '#FFEDD5',
    borderLight: '#FDBA74',
    bgDark: '#431407',
    borderDark: '#7C2D12',
  },
  {
    id: 'neutral',
    emoji: 'meh',
    label: 'Нормально',
    color: '#3B82F6',
    bgLight: '#DBEAFE',
    borderLight: '#93C5FD',
    bgDark: '#172554',
    borderDark: '#1E3A8A',
  },
  {
    id: 'happy',
    emoji: 'smile',
    label: 'Добре',
    color: '#22C55E',
    bgLight: '#DCFCE7',
    borderLight: '#86EFAC',
    bgDark: '#052E16',
    borderDark: '#14532D',
  },
  {
    id: 'very_happy',
    emoji: 'grin',
    label: 'Чудово',
    color: '#10B981',
    bgLight: '#D1FAE5',
    borderLight: '#6EE7B7',
    bgDark: '#064E3B',
    borderDark: '#065F46',
  },
];

interface MoodRecord {
  id: string;
  emoji: string;
  timestamp: number;
}

const getInitialRecords = (): MoodRecord[] => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 12).getTime();
  const yesterday1 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 21, 40).getTime();
  const yesterday2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 8, 5).getTime();
  const dayBefore = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 19, 22).getTime();

  return [
    { id: '1', emoji: 'grin', timestamp: today },
    { id: '2', emoji: 'meh', timestamp: yesterday1 },
    { id: '3', emoji: 'smile', timestamp: yesterday2 },
    { id: '4', emoji: 'frown', timestamp: dayBefore },
  ];
};

function formatRelativeDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();

  const pad = (n: number) => n.toString().padStart(2, '0');
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;

  const d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const d2 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round((d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return `Сьогодні, ${timeStr}`;
  } else if (diffDays === 1) {
    return `Вчора, ${timeStr}`;
  } else if (diffDays === 2) {
    return `Позавчора, ${timeStr}`;
  } else {
    const monthsUk = [
      'січ.', 'лют.', 'бер.', 'квіт.', 'трав.', 'черв.',
      'лип.', 'серп.', 'вер.', 'жовт.', 'лист.', 'груд.',
    ];
    return `${date.getDate()} ${monthsUk[date.getMonth()]}, ${timeStr}`;
  }
}

function TrashIcon({ color = '#9CA3AF', size = 18 }: { color?: string; size?: number }) {
  const scale = size / 20;
  return (
    <View style={[styles.trashWrapper, { width: size, height: size }]}>
      <View
        style={{
          width: 6 * scale,
          height: 1.8 * scale,
          backgroundColor: color,
          borderTopLeftRadius: 1 * scale,
          borderTopRightRadius: 1 * scale,
        }}
      />
      <View
        style={{
          width: 14 * scale,
          height: 1.8 * scale,
          backgroundColor: color,
          borderRadius: 1 * scale,
          marginBottom: 1 * scale,
        }}
      />
      <View
        style={{
          width: 11 * scale,
          height: 12 * scale,
          borderWidth: 1.6 * scale,
          borderColor: color,
          borderBottomLeftRadius: 2.5 * scale,
          borderBottomRightRadius: 2.5 * scale,
          borderTopWidth: 0,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingTop: 1.5 * scale,
        }}>
        <View
          style={{
            width: 1.2 * scale,
            height: 6 * scale,
            backgroundColor: color,
            borderRadius: 0.6 * scale,
          }}
        />
        <View
          style={{
            width: 1.2 * scale,
            height: 6 * scale,
            backgroundColor: color,
            borderRadius: 0.6 * scale,
          }}
        />
      </View>
    </View>
  );
}

export default function MoodTrackerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [history, setHistory] = useState<MoodRecord[]>(getInitialRecords);

  const mostFrequentEmoji = useMemo(() => {
    if (history.length === 0) return null;
    const counts: Record<string, number> = {};
    for (const item of history) {
      counts[item.emoji] = (counts[item.emoji] || 0) + 1;
    }
    let topEmoji: string | null = null;
    let maxCount = 0;
    for (const [emoji, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        topEmoji = emoji;
      }
    }
    return topEmoji;
  }, [history]);

  const getMoodStyle = useCallback((emoji: string) => {
    const found = MOOD_OPTIONS.find((m) => m.emoji === emoji);
    return found ?? MOOD_OPTIONS[2];
  }, []);

  const handleAddMood = useCallback((emoji: string) => {
    const newRecord: MoodRecord = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      emoji,
      timestamp: Date.now(),
    };
    setHistory((prev) => [newRecord, ...prev]);
  }, []);

  const handleDeleteItem = useCallback((record: MoodRecord) => {
    const executeDelete = () => {
      setHistory((prev) => prev.filter((item) => item.id !== record.id));
    };

    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.confirm('Видалити цей запис настрою?')) {
        executeDelete();
      }
    } else {
      Alert.alert(
        'Видалити запис?',
        `Ви впевнені, що хочете видалити цей запис?`,
        [
          { text: 'Скасувати', style: 'cancel' },
          {
            text: 'Видалити',
            style: 'destructive',
            onPress: executeDelete,
          },
        ]
      );
    }
  }, []);

  const handleClearAll = useCallback(() => {
    if (history.length === 0) {
      if (Platform.OS === 'web') {
        alert('Історія вже порожня.');
      } else {
        Alert.alert('Повідомлення', 'Історія вже порожня.');
      }
      return;
    }

    const executeClear = () => {
      setHistory([]);
    };

    if (Platform.OS === 'web') {
      if (
        typeof window !== 'undefined' &&
        window.confirm('Очистити всю історію?\n\nВи впевнені, що хочете видалити всі записи?')
      ) {
        executeClear();
      }
    } else {
      Alert.alert(
        'Очистити всю історію?',
        'Ви впевнені, що хочете видалити всі записи настрою? Цю дію не можна скасувати.',
        [
          { text: 'Скасувати', style: 'cancel' },
          {
            text: 'Очистити',
            style: 'destructive',
            onPress: executeClear,
          },
        ]
      );
    }
  }, [history.length]);

  const renderItem = useCallback(
    ({ item }: { item: MoodRecord }) => {
      const moodStyle = getMoodStyle(item.emoji);
      const bgCircle = isDark ? moodStyle.bgDark : moodStyle.bgLight;
      const borderCircle = isDark ? moodStyle.borderDark : moodStyle.borderLight;

      return (
        <Pressable
          style={({ pressed }) => [
            styles.historyItem,
            isDark && styles.historyItemDark,
            pressed && styles.historyItemPressed,
          ]}
          onPress={() => handleDeleteItem(item)}>
          <View style={styles.historyItemLeft}>
            <View
              style={[
                styles.emojiBadge,
                {
                  backgroundColor: bgCircle,
                  borderColor: borderCircle,
                },
              ]}>
              <FontAwesome5 name={item.emoji} size={20} color={moodStyle.color} />
            </View>
            <Text style={[styles.historyDateText, isDark && styles.textDark]}>
              {formatRelativeDate(item.timestamp)}
            </Text>
          </View>

          <Pressable
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            onPress={() => handleDeleteItem(item)}
            style={styles.trashBtn}>
            <TrashIcon color={isDark ? '#9CA3AF' : '#A0A6B2'} size={18} />
          </Pressable>
        </Pressable>
      );
    },
    [getMoodStyle, handleDeleteItem, isDark]
  );

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['top', 'left', 'right']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <View style={styles.innerContent}>
        <View style={styles.header}>
          <Text style={[styles.title, isDark && styles.textDark]}>Трекер настрою</Text>
          <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
            Як ти почуваєшся сьогодні?
          </Text>
        </View>

        <View style={styles.emojiRow}>
          {MOOD_OPTIONS.map((mood) => {
            const bg = isDark ? mood.bgDark : mood.bgLight;
            const border = isDark ? mood.borderDark : mood.borderLight;

            return (
              <Pressable
                key={mood.id}
                onPress={() => handleAddMood(mood.emoji)}
                accessibilityLabel={mood.label}
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.emojiButton,
                  {
                    backgroundColor: bg,
                    borderColor: border,
                  },
                  pressed && styles.emojiButtonPressed,
                ]}>
                <FontAwesome5 name={mood.emoji} size={26} color={mood.color} />
              </Pressable>
            );
          })}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Історія</Text>
          <View style={styles.summaryContainer}>
            <Text style={[styles.summaryLabel, isDark && styles.subtitleDark]}>найчастіше:</Text>
            {mostFrequentEmoji ? (
              <View style={styles.mostFrequentBadge}>
                <FontAwesome5 name={mostFrequentEmoji} size={22} color={getMoodStyle(mostFrequentEmoji).color} />
              </View>
            ) : (
              <Text style={[styles.summaryLabel, isDark && styles.subtitleDark]}> —</Text>
            )}
          </View>
        </View>

        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyEmoji]}>📝</Text>
              <Text style={[styles.emptyTitle, isDark && styles.textDark]}>
                Історія порожня
              </Text>
              <Text style={[styles.emptySubtitle, isDark && styles.subtitleDark]}>
                Оберіть настрій вище, щоб додати перший запис
              </Text>
            </View>
          }
        />

        {history.length > 0 && (
          <View style={styles.footerContainer}>
            <Pressable
              onPress={handleClearAll}
              style={({ pressed }) => [
                styles.clearButton,
                isDark && styles.clearButtonDark,
                pressed && styles.clearButtonPressed,
              ]}>
              <Text style={[styles.clearButtonText, isDark && styles.clearButtonTextDark]}>
                Очистити всю історію
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
