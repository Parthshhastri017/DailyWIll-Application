import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ChartBar as BarChart, ChartLine as LineChart, Calendar, Award } from 'lucide-react-native';
import { sampleHabits } from '@/data/habits';

export default function ProgressScreen() {
  const { colors } = useTheme();
  
  // Calculate completion rates
  const weeklyCompletionRate = 85; // This would come from actual data
  const monthlyCompletionRate = 72; // This would come from actual data
  
  // Get top habits
  const topHabits = [...sampleHabits]
    .sort((a, b) => b.streak - a.streak)
    .slice(0, 3);
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Progress</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Track your habit-building journey
        </Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.statsSection}>
          <View style={[styles.statsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.statsHeader}>
              <Text style={[styles.statsTitle, { color: colors.text }]}>Weekly Overview</Text>
              <BarChart size={24} color={colors.primary} />
            </View>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.text }]}>{weeklyCompletionRate}%</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Completion</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.text }]}>7</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Day Streak</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.text }]}>3</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Rewards</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.chartSection}>
          <View style={[styles.chartCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.chartHeader}>
              <Text style={[styles.chartTitle, { color: colors.text }]}>Monthly Progress</Text>
              <LineChart size={24} color={colors.primary} />
            </View>
            
            <View style={styles.chartPlaceholder}>
              {/* This would be replaced with an actual chart component */}
              <View style={styles.barContainer}>
                {[65, 70, 60, 80, 75, 85, 90].map((value, index) => (
                  <View key={index} style={styles.barWrapper}>
                    <View 
                      style={[
                        styles.bar, 
                        { 
                          height: `${value}%`, 
                          backgroundColor: colors.primary,
                        }
                      ]} 
                    />
                    <Text style={[styles.barLabel, { color: colors.textSecondary }]}>
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.chartFooter}>
              <Text style={[styles.chartFooterText, { color: colors.textSecondary }]}>
                {monthlyCompletionRate}% average completion rate this month
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.topHabitsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Top Performing Habits</Text>
          
          <View style={styles.topHabitsList}>
            {topHabits.map((habit, index) => (
              <View 
                key={habit.id} 
                style={[
                  styles.topHabitCard, 
                  { 
                    backgroundColor: colors.card, 
                    borderColor: colors.border,
                  }
                ]}
              >
                <View style={[styles.topHabitRank, { backgroundColor: colors.primaryLight }]}>
                  <Text style={[styles.topHabitRankText, { color: colors.primary }]}>#{index + 1}</Text>
                </View>
                <View style={styles.topHabitInfo}>
                  <Text style={[styles.topHabitName, { color: colors.text }]}>{habit.name}</Text>
                  <Text style={[styles.topHabitStreak, { color: colors.textSecondary }]}>
                    {habit.streak} day streak
                  </Text>
                </View>
                <View style={[styles.topHabitCompletion, { borderColor: colors.border }]}>
                  <Text style={[styles.topHabitCompletionText, { color: colors.primary }]}>
                    {habit.completionRate}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.calendarSection}>
          <View style={[styles.calendarCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.calendarHeader}>
              <Text style={[styles.calendarTitle, { color: colors.text }]}>Habit Calendar</Text>
              <Calendar size={24} color={colors.primary} />
            </View>
            
            <Text style={[styles.calendarSubtitle, { color: colors.textSecondary }]}>
              April 2025
            </Text>
            
            <View style={styles.calendarPlaceholder}>
              {/* This would be replaced with an actual calendar component */}
              <View style={styles.calendarGrid}>
                {Array(30).fill(0).map((_, index) => {
                  const isCompleted = Math.random() > 0.3; // Random completion for demo
                  return (
                    <View 
                      key={index} 
                      style={[
                        styles.calendarDay, 
                        { 
                          backgroundColor: isCompleted ? colors.primaryLight : colors.border,
                          borderColor: isCompleted ? colors.primary : colors.border,
                        }
                      ]}
                    >
                      <Text 
                        style={[
                          styles.calendarDayText, 
                          { color: isCompleted ? colors.primary : colors.textSecondary }
                        ]}
                      >
                        {index + 1}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.achievementsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Achievements</Text>
          
          <View style={[styles.achievementCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.achievementHeader}>
              <Award size={24} color={colors.primary} />
              <Text style={[styles.achievementTitle, { color: colors.text }]}>Consistency Master</Text>
            </View>
            <Text style={[styles.achievementDesc, { color: colors.textSecondary }]}>
              Complete all habits for 7 consecutive days
            </Text>
            <View style={styles.achievementProgress}>
              <View 
                style={[
                  styles.achievementProgressBar, 
                  { backgroundColor: colors.border, width: '100%' }
                ]}
              />
              <View 
                style={[
                  styles.achievementProgressFill, 
                  { 
                    backgroundColor: colors.primary, 
                    width: '100%' 
                  }
                ]}
              />
            </View>
            <Text style={[styles.achievementStatus, { color: colors.primary }]}>
              Completed!
            </Text>
          </View>
          
          <View style={[styles.achievementCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.achievementHeader}>
              <Award size={24} color={colors.primary} />
              <Text style={[styles.achievementTitle, { color: colors.text }]}>Habit Builder</Text>
            </View>
            <Text style={[styles.achievementDesc, { color: colors.textSecondary }]}>
              Maintain a 14-day streak on any habit
            </Text>
            <View style={styles.achievementProgress}>
              <View 
                style={[
                  styles.achievementProgressBar, 
                  { backgroundColor: colors.border, width: '100%' }
                ]}
              />
              <View 
                style={[
                  styles.achievementProgressFill, 
                  { 
                    backgroundColor: colors.primary, 
                    width: '50%' 
                  }
                ]}
              />
            </View>
            <Text style={[styles.achievementStatus, { color: colors.textSecondary }]}>
              7/14 days
            </Text>
          </View>
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
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 3,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
  },
  chartSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  chartCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  chartPlaceholder: {
    height: 200,
    marginVertical: 10,
    justifyContent: 'flex-end',
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: 20,
    borderRadius: 10,
  },
  barLabel: {
    marginTop: 8,
    fontSize: 12,
  },
  chartFooter: {
    marginTop: 15,
    alignItems: 'center',
  },
  chartFooterText: {
    fontSize: 14,
  },
  topHabitsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },
  topHabitsList: {
    gap: 12,
  },
  topHabitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 15,
    borderWidth: 3,
  },
  topHabitRank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  topHabitRankText: {
    fontWeight: '700',
    fontSize: 16,
  },
  topHabitInfo: {
    flex: 1,
  },
  topHabitName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  topHabitStreak: {
    fontSize: 14,
  },
  topHabitCompletion: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
  topHabitCompletionText: {
    fontWeight: '700',
    fontSize: 14,
  },
  calendarSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  calendarCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 3,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  calendarSubtitle: {
    fontSize: 16,
    marginBottom: 15,
  },
  calendarPlaceholder: {
    marginVertical: 10,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  calendarDay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  calendarDayText: {
    fontWeight: '600',
    fontSize: 14,
  },
  achievementsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  achievementCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 3,
    marginBottom: 15,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
  },
  achievementDesc: {
    fontSize: 14,
    marginBottom: 15,
  },
  achievementProgress: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 10,
  },
  achievementProgressBar: {
    height: '100%',
    position: 'absolute',
  },
  achievementProgressFill: {
    height: '100%',
    position: 'absolute',
  },
  achievementStatus: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
});