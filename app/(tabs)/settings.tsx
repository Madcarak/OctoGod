import { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Volume2, VolumeX, HelpCircle, Info, RefreshCw, Save } from 'lucide-react-native';

export default function SettingsScreen() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [tutorialEnabled, setTutorialEnabled] = useState(true);
  const [difficultyLevel, setDifficultyLevel] = useState('normal');

  const resetGame = () => {
    Alert.alert(
      'Reset Game',
      'Are you sure you want to reset all progress? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          onPress: () => console.log('Game reset confirmed'),
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Audio</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Volume2 size={20} color="#e2e8f0" />
              <Text style={styles.settingLabel}>Sound Effects</Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#334155', true: '#0e7490' }}
              thumbColor={soundEnabled ? '#0891b2' : '#64748b'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Volume2 size={20} color="#e2e8f0" />
              <Text style={styles.settingLabel}>Music</Text>
            </View>
            <Switch
              value={musicEnabled}
              onValueChange={setMusicEnabled}
              trackColor={{ false: '#334155', true: '#0e7490' }}
              thumbColor={musicEnabled ? '#0891b2' : '#64748b'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <VolumeX size={20} color="#e2e8f0" />
              <Text style={styles.settingLabel}>Vibration</Text>
            </View>
            <Switch
              value={vibrationEnabled}
              onValueChange={setVibrationEnabled}
              trackColor={{ false: '#334155', true: '#0e7490' }}
              thumbColor={vibrationEnabled ? '#0891b2' : '#64748b'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gameplay</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <HelpCircle size={20} color="#e2e8f0" />
              <Text style={styles.settingLabel}>Tutorial Tips</Text>
            </View>
            <Switch
              value={tutorialEnabled}
              onValueChange={setTutorialEnabled}
              trackColor={{ false: '#334155', true: '#0e7490' }}
              thumbColor={tutorialEnabled ? '#0891b2' : '#64748b'}
            />
          </View>
          
          <Text style={styles.settingGroupLabel}>Difficulty</Text>
          
          <View style={styles.difficultyContainer}>
            <TouchableOpacity
              style={[
                styles.difficultyButton,
                difficultyLevel === 'easy' && styles.difficultyButtonActive
              ]}
              onPress={() => setDifficultyLevel('easy')}
            >
              <Text style={[
                styles.difficultyButtonText,
                difficultyLevel === 'easy' && styles.difficultyButtonTextActive
              ]}>
                Easy
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.difficultyButton,
                difficultyLevel === 'normal' && styles.difficultyButtonActive
              ]}
              onPress={() => setDifficultyLevel('normal')}
            >
              <Text style={[
                styles.difficultyButtonText,
                difficultyLevel === 'normal' && styles.difficultyButtonTextActive
              ]}>
                Normal
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.difficultyButton,
                difficultyLevel === 'hard' && styles.difficultyButtonActive
              ]}
              onPress={() => setDifficultyLevel('hard')}
            >
              <Text style={[
                styles.difficultyButtonText,
                difficultyLevel === 'hard' && styles.difficultyButtonTextActive
              ]}>
                Hard
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Data</Text>
          
          <TouchableOpacity style={styles.dataButton} onPress={resetGame}>
            <RefreshCw size={20} color="#ef4444" />
            <Text style={[styles.dataButtonText, { color: '#ef4444' }]}>Reset Game Progress</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.dataButton}>
            <Save size={20} color="#0891b2" />
            <Text style={styles.dataButtonText}>Save Game</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.aboutContainer}>
            <Text style={styles.gameTitle}>OctoGod</Text>
            <Text style={styles.gameVersion}>Version 1.0.0</Text>
            <Text style={styles.gameDescription}>
              You play as a divine octopus, protector of the oceans, observing humanity's evolution through the ages. 
              Your mission is to maintain the balance between human progress and the preservation of the marine ecosystem.
            </Text>
            
            <TouchableOpacity style={styles.creditsButton}>
              <Info size={20} color="#0891b2" />
              <Text style={styles.creditsButtonText}>Credits</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'PixelifySans-Bold',
    fontSize: 18,
    color: '#e2e8f0',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 16,
    color: '#e2e8f0',
    marginLeft: 12,
  },
  settingGroupLabel: {
    fontFamily: 'PixelifySans-SemiBold',
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 12,
    marginTop: 8,
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difficultyButton: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  difficultyButtonActive: {
    backgroundColor: '#0891b2',
  },
  difficultyButtonText: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 14,
    color: '#94a3b8',
  },
  difficultyButtonTextActive: {
    color: '#ffffff',
  },
  dataButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  dataButtonText: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 16,
    color: '#0891b2',
    marginLeft: 12,
  },
  aboutContainer: {
    alignItems: 'center',
  },
  gameTitle: {
    fontFamily: 'PressStart2P',
    fontSize: 20,
    color: '#0891b2',
    marginBottom: 8,
  },
  gameVersion: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 16,
  },
  gameDescription: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  creditsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  creditsButtonText: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 14,
    color: '#0891b2',
    marginLeft: 8,
  },
});