import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

type StreakMeterProps = {
  streak: number;
};

export default function StreakMeter({ streak }: StreakMeterProps) {
  const { colors } = useTheme();
  
  // Maximum streak to display (for UI purposes)
  const maxDisplayStreak = 10;
  const displayStreak = Math.min(streak, maxDisplayStreak);
  
  return (
    <View style={styles.container}>
      {Array(maxDisplayStreak).fill(0).map((_, index) => (
        <View 
          key={index} 
          style={[
            styles.streakDot, 
            { 
              backgroundColor: index < displayStreak ? colors.primary : colors.border,
              height: 12 + (index < displayStreak ? 8 : 0),
            }
          ]} 
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 40,
  },
  streakDot: {
    width: 12,
    borderRadius: 6,
  },
});