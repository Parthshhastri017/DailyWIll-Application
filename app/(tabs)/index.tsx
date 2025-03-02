import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { CirclePlus as PlusCircle, CircleCheck as CheckCircle, Circle, Trophy } from 'lucide-react-native';
import StreakMeter from '@/components/StreakMeter';
import HabitCard from '@/components/HabitCard';
import { sampleHabits } from '@/data/habits';

export default function HomeScreen() {
  const { colors } = useTheme();
  const [habits, setHabits] = useState(sampleHabits);
  const [currentStreak, setCurrentStreak] = useState(7);
  const [todayProgress, setTodayProgress] = useState(0);
  
  useEffect(() => {
    // Calculate today's progress
    const completed = habits.filter(habit => habit.completedToday).length;
    setTodayProgress(habits.length > 0 ? Math.round((completed / habits.length) * 100) : 0);
  }, [habits]);

  const toggleHabitCompletion = (id: string) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { ...habit, completedToday: !habit.completedToday } 
        : habit
    ));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>DailyWill</Text>
        <View style={styles.dateContainer}>
          <Text style={[styles.date, { color: colors.text }]}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </Text>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.streakSection}>
          <View style={[styles.streakCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.streakHeader}>
              <Text style={[styles.streakTitle, { color: colors.text }]}>Current Streak</Text>
              <Trophy size={24} color={colors.primary} />
            </View>
            <StreakMeter streak={currentStreak} />
            <Text style={[styles.streakText, { color: colors.text }]}>
              {currentStreak} day{currentStreak !== 1 ? 's' : ''} streak!
            </Text>
            <Text style={[styles.streakSubtext, { color: colors.textSecondary }]}>
              Keep it up to unlock rewards
            </Text>
          </View>
        </View>
        
        <View style={styles.progressSection}>
          <View style={[styles.progressCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.progressTitle, { color: colors.text }]}>Today's Progress</Text>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { backgroundColor: colors.border, width: '100%' }
                ]}
              />
              <View 
                style={[
                  styles.progressBarFill, 
                  { 
                    backgroundColor: colors.primary, 
                    width: `${todayProgress}%` 
                  }
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: colors.text }]}>
              {todayProgress}% Complete
            </Text>
          </View>
        </View>
        
        <View style={styles.habitsSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Habits</Text>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.primary }]}>
              <PlusCircle size={20} color="#fff" />
              <Text style={styles.addButtonText}>Add New</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.habitsList}>
            {habits.map(habit => (
              <HabitCard 
                key={habit.id}
                habit={habit}
                onToggle={() => toggleHabitCompletion(habit.id)}
              />
            ))}
          </View>
        </View>
        
        <View style={styles.rewardsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Rewards Unlocked</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rewardsScroll}>
            <View style={[styles.rewardCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=400&q=80' }} 
                style={styles.rewardImage} 
              />
              <Text style={[styles.rewardTitle, { color: colors.text }]}>Wallpaper</Text>
              <Text style={[styles.rewardSubtitle, { color: colors.textSecondary }]}>5-day streak</Text>
            </View>
            <View style={[styles.rewardCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[styles.badgeContainer, { backgroundColor: colors.primaryLight }]}>
                <Trophy size={40} color={colors.primary} />
              </View>
              <Text style={[styles.rewardTitle, { color: colors.text }]}>Beginner Badge</Text>
              <Text style={[styles.rewardSubtitle, { color: colors.textSecondary }]}>7-day streak</Text>
            </View>
            <View style={[styles.rewardCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: 0.6 }]}>
              <View style={[styles.badgeContainer, { backgroundColor: colors.border }]}>
                <Trophy size={40} color={colors.textSecondary} />
              </View>
              <Text style={[styles.rewardTitle, { color: colors.text }]}>Pro Badge</Text>
              <Text style={[styles.rewardSubtitle, { color: colors.textSecondary }]}>Unlock at 14 days</Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 5,
  },
  dateContainer: {
    marginTop: 5,
  },
  date: {
    fontSize: 16,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  streakSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  streakCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 3,
  },
  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  streakTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  streakText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 15,
  },
  streakSubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  progressSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 3,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },
  progressBarContainer: {
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    position: 'absolute',
  },
  progressBarFill: {
    height: '100%',
    position: 'absolute',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  habitsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 5,
  },
  habitsList: {
    gap: 12,
  },
  rewardsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  rewardsScroll: {
    marginTop: 15,
  },
  rewardCard: {
    width: 150,
    borderRadius: 16,
    padding: 15,
    marginRight: 15,
    borderWidth: 3,
    alignItems: 'center',
  },
  rewardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  badgeContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  rewardSubtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
});