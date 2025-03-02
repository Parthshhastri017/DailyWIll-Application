import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { CircleCheck as CheckCircle, Circle } from 'lucide-react-native';
import { Habit } from '@/types';

type HabitCardProps = {
  habit: Habit;
  onToggle: () => void;
};

export default function HabitCard({ habit, onToggle }: HabitCardProps) {
  const { colors } = useTheme();
  
  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor: colors.card, 
          borderColor: colors.border,
          borderLeftColor: habit.color || colors.primary,
        }
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]}>{habit.name}</Text>
        <Text style={[styles.streak, { color: colors.textSecondary }]}>
          {habit.streak} day streak
        </Text>
      </View>
      
      <TouchableOpacity style={styles.checkButton} onPress={onToggle}>
        {habit.completedToday ? (
          <CheckCircle size={28} color={colors.primary} />
        ) : (
          <Circle size={28} color={colors.textSecondary} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    padding: 15,
    borderWidth: 3,
    borderLeftWidth: 8,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  streak: {
    fontSize: 14,
  },
  checkButton: {
    padding: 5,
  },
});