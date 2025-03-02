import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { User, Settings, Moon, Sun, Bell, Award, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const { theme, toggleTheme, colors } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const isDarkMode = theme === 'dark';
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.profileHeader}>
              <View style={[styles.avatarContainer, { borderColor: colors.border }]}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80' }} 
                  style={styles.avatar} 
                />
              </View>
              <View style={styles.profileInfo}>
                <Text style={[styles.profileName, { color: colors.text }]}>Alex Johnson</Text>
                <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>
                  alex.johnson@example.com
                </Text>
                <TouchableOpacity style={[styles.editButton, { borderColor: colors.border }]}>
                  <Text style={[styles.editButtonText, { color: colors.text }]}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.text }]}>7</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Day Streak</Text>
              </View>
              <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.text }]}>5</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Habits</Text>
              </View>
              <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.text }]}>3</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Rewards</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings</Text>
          
          <View style={[styles.settingsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TouchableOpacity 
              style={styles.settingsItem} 
              onPress={toggleTheme}
            >
              <View style={styles.settingsItemLeft}>
                {isDarkMode ? (
                  <Moon size={24} color={colors.primary} />
                ) : (
                  <Sun size={24} color={colors.primary} />
                )}
                <Text style={[styles.settingsItemText, { color: colors.text }]}>
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.border, true: colors.primaryLight }}
                thumbColor={isDarkMode ? colors.primary : '#f4f3f4'}
              />
            </TouchableOpacity>
            
            <View style={[styles.settingsDivider, { backgroundColor: colors.border }]} />
            
            <TouchableOpacity 
              style={styles.settingsItem}
              onPress={() => setNotificationsEnabled(!notificationsEnabled)}
            >
              <View style={styles.settingsItemLeft}>
                <Bell size={24} color={colors.primary} />
                <Text style={[styles.settingsItemText, { color: colors.text }]}>Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.border, true: colors.primaryLight }}
                thumbColor={notificationsEnabled ? colors.primary : '#f4f3f4'}
              />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.rewardsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>My Rewards</Text>
          
          <View style={[styles.rewardsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.rewardsHeader}>
              <Award size={24} color={colors.primary} />
              <Text style={[styles.rewardsTitle, { color: colors.text }]}>Unlocked Rewards</Text>
            </View>
            
            <Text style={[styles.rewardsCount, { color: colors.textSecondary }]}>
              You've unlocked 3 rewards
            </Text>
            
            <TouchableOpacity style={[styles.viewAllButton, { borderColor: colors.border }]}>
              <Text style={[styles.viewAllButtonText, { color: colors.text }]}>View All Rewards</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.accountSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
          
          <View style={[styles.accountCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TouchableOpacity style={styles.accountItem}>
              <User size={24} color={colors.primary} />
              <Text style={[styles.accountItemText, { color: colors.text }]}>Account Details</Text>
            </TouchableOpacity>
            
            <View style={[styles.accountDivider, { backgroundColor: colors.border }]} />
            
            <TouchableOpacity style={styles.accountItem}>
              <Settings size={24} color={colors.primary} />
              <Text style={[styles.accountItemText, { color: colors.text }]}>Preferences</Text>
            </TouchableOpacity>
            
            <View style={[styles.accountDivider, { backgroundColor: colors.border }]} />
            
            <TouchableOpacity style={styles.accountItem}>
              <LogOut size={24} color="#FF4D4F" />
              <Text style={[styles.accountItemText, { color: "#FF4D4F" }]}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.versionSection}>
          <Text style={[styles.versionText, { color: colors.textSecondary }]}>
            DailyWill v1.0.0
          </Text>
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
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    marginBottom: 10,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 2,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontWeight: '600',
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
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
  statDivider: {
    width: 1,
    height: 40,
  },
  settingsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },
  settingsCard: {
    borderRadius: 16,
    padding: 5,
    borderWidth: 3,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 15,
  },
  settingsDivider: {
    height: 1,
    width: '100%',
  },
  rewardsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  rewardsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 3,
  },
  rewardsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
  },
  rewardsCount: {
    fontSize: 14,
    marginBottom: 15,
  },
  viewAllButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
  },
  viewAllButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  accountSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  accountCard: {
    borderRadius: 16,
    padding: 5,
    borderWidth: 3,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  accountItemText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 15,
  },
  accountDivider: {
    height: 1,
    width: '100%',
  },
  versionSection: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  versionText: {
    fontSize: 14,
  },
});