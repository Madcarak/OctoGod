import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Clock, Lock } from 'lucide-react-native';

// Define achievements and progress data
const ACHIEVEMENTS = [
  {
    id: 'harmony',
    title: 'Harmony Keeper',
    description: 'Maintain perfect ecosystem balance for 10 turns',
    progress: 3,
    total: 10,
    unlocked: false,
    age: 'Prehistory',
    reward: '+20 Divine Energy'
  },
  {
    id: 'firstBlessing',
    title: 'First Blessing',
    description: 'Use your first divine power',
    progress: 1,
    total: 1,
    unlocked: true,
    age: 'Prehistory',
    reward: 'Unlock "Coral Whisper" ability'
  },
  {
    id: 'biodiversity',
    title: 'Biodiversity Champion',
    description: 'Reach 100% biodiversity in Prehistory',
    progress: 85,
    total: 100,
    unlocked: false,
    age: 'Prehistory',
    reward: '+15% effectiveness to all preservation powers'
  },
  {
    id: 'navigator',
    title: 'Divine Navigator',
    description: 'Guide 5 human ships to safe routes',
    progress: 2,
    total: 5,
    unlocked: false,
    age: 'Antiquity',
    reward: 'Unlock "Safe Passage" ability'
  },
  {
    id: 'cleanser',
    title: 'Ocean Cleanser',
    description: 'Reduce pollution to 0% in Industrial Age',
    progress: 0,
    total: 100,
    unlocked: false,
    age: 'Industrial',
    reward: 'Unlock "Purification Wave" ability'
  },
  {
    id: 'balance',
    title: 'Perfect Balance',
    description: 'Reach 80% in all metrics simultaneously',
    progress: 0,
    total: 100,
    unlocked: false,
    age: 'Modern',
    reward: 'Unlock "Divine Harmony" ending'
  }
];

// Define timeline events
const TIMELINE_EVENTS = [
  {
    id: 'event1',
    title: 'The Beginning',
    description: 'You awaken as the divine octopus, guardian of the oceans.',
    age: 'Prehistory',
    year: '10,000 BCE',
    completed: true
  },
  {
    id: 'event2',
    title: 'First Human Contact',
    description: 'Humans establish their first coastal settlements.',
    age: 'Prehistory',
    year: '8,000 BCE',
    completed: true
  },
  {
    id: 'event3',
    title: 'Fishing Revolution',
    description: 'Humans develop more advanced fishing techniques.',
    age: 'Antiquity',
    year: '3,000 BCE',
    completed: false
  },
  {
    id: 'event4',
    title: 'Age of Exploration',
    description: 'Human ships begin to traverse the oceans in greater numbers.',
    age: 'Antiquity',
    year: '500 BCE',
    completed: false
  },
  {
    id: 'event5',
    title: 'Steam Power',
    description: 'The first steam-powered vessels appear on the oceans.',
    age: 'Industrial',
    year: '1820 CE',
    completed: false
  },
  {
    id: 'event6',
    title: 'Oil Discovery',
    description: 'Humans discover underwater oil reserves.',
    age: 'Modern',
    year: '1950 CE',
    completed: false
  },
  {
    id: 'event7',
    title: 'Plastic Crisis',
    description: 'Plastic pollution reaches critical levels in the oceans.',
    age: 'Modern',
    year: '2000 CE',
    completed: false
  }
];

export default function AchievementsScreen() {
  const [activeTab, setActiveTab] = useState('achievements');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'achievements' && styles.activeTabButton]}
          onPress={() => setActiveTab('achievements')}
        >
          <Trophy size={18} color={activeTab === 'achievements' ? '#0891b2' : '#64748b'} />
          <Text style={[styles.tabButtonText, activeTab === 'achievements' && styles.activeTabButtonText]}>
            Achievements
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'timeline' && styles.activeTabButton]}
          onPress={() => setActiveTab('timeline')}
        >
          <Clock size={18} color={activeTab === 'timeline' ? '#0891b2' : '#64748b'} />
          <Text style={[styles.tabButtonText, activeTab === 'timeline' && styles.activeTabButtonText]}>
            Timeline
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'achievements' ? (
        <ScrollView style={styles.contentContainer}>
          {ACHIEVEMENTS.map((achievement) => (
            <View key={achievement.id} style={styles.achievementCard}>
              <View style={styles.achievementHeader}>
                <View style={[styles.achievementIcon, achievement.unlocked ? styles.achievementIconUnlocked : {}]}>
                  {achievement.unlocked ? (
                    <Trophy size={24} color="#0891b2" />
                  ) : (
                    <Lock size={24} color="#64748b" />
                  )}
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementAge}>{achievement.age} Age</Text>
                </View>
              </View>
              
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { width: `${(achievement.progress / achievement.total) * 100}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  {achievement.progress}/{achievement.total}
                </Text>
              </View>
              
              <View style={styles.rewardContainer}>
                <Text style={styles.rewardLabel}>Reward:</Text>
                <Text style={styles.rewardText}>{achievement.reward}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView style={styles.contentContainer}>
          <View style={styles.timelineContainer}>
            {TIMELINE_EVENTS.map((event, index) => (
              <View key={event.id} style={styles.timelineEvent}>
                <View style={styles.timelineLeft}>
                  <View style={[
                    styles.timelineDot,
                    event.completed ? styles.timelineDotCompleted : {}
                  ]} />
                  {index < TIMELINE_EVENTS.length - 1 && (
                    <View style={[
                      styles.timelineLine,
                      TIMELINE_EVENTS[index + 1].completed ? styles.timelineLineCompleted : {}
                    ]} />
                  )}
                </View>
                
                <View style={styles.timelineContent}>
                  <View style={styles.timelineHeader}>
                    <Text style={styles.timelineTitle}>{event.title}</Text>
                    <Text style={styles.timelineYear}>{event.year}</Text>
                  </View>
                  <Text style={styles.timelineAge}>{event.age} Age</Text>
                  <Text style={styles.timelineDescription}>{event.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0f1d',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#0f172a',
  },
  title: {
    fontFamily: 'PressStart2P',
    fontSize: 18,
    color: '#0891b2',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    padding: 8,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#0f172a',
  },
  tabButtonText: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 14,
    color: '#64748b',
    marginLeft: 8,
  },
  activeTabButtonText: {
    color: '#0891b2',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  achievementCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  achievementIconUnlocked: {
    backgroundColor: '#0e7490',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontFamily: 'PixelifySans-Bold',
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 4,
  },
  achievementAge: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: '#94a3b8',
  },
  achievementDescription: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#0891b2',
    borderRadius: 4,
  },
  progressText: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 12,
    color: '#94a3b8',
    width: 40,
    textAlign: 'right',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    padding: 10,
    borderRadius: 8,
  },
  rewardLabel: {
    fontFamily: 'PixelifySans-SemiBold',
    fontSize: 14,
    color: '#94a3b8',
    marginRight: 8,
  },
  rewardText: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 14,
    color: '#0891b2',
  },
  timelineContainer: {
    paddingVertical: 8,
  },
  timelineEvent: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineLeft: {
    width: 24,
    alignItems: 'center',
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#334155',
    borderWidth: 2,
    borderColor: '#1e293b',
  },
  timelineDotCompleted: {
    backgroundColor: '#0891b2',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#334155',
    marginVertical: 4,
  },
  timelineLineCompleted: {
    backgroundColor: '#0891b2',
  },
  timelineContent: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginLeft: 12,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  timelineTitle: {
    fontFamily: 'PixelifySans-Bold',
    fontSize: 16,
    color: '#e2e8f0',
  },
  timelineYear: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 12,
    color: '#94a3b8',
    backgroundColor: '#0f172a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timelineAge: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 14,
    color: '#0891b2',
    marginBottom: 8,
  },
  timelineDescription: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: '#cbd5e1',
  },
});