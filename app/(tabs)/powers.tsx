import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Droplets, Wind, Shield, Zap, AlertTriangle } from 'lucide-react-native';
import GameEvent from '../../components/GameEntities/GameEvent';

// Define powers for each age
const POWERS = {
  'Prehistory': [
    {
      id: 'currents',
      name: 'Ocean Currents',
      description: 'Manipulate currents to redistribute fish populations',
      energyCost: 20,
      icon: Wind,
      unlocked: true,
      effect: 'Increases biodiversity by 10%',
      cooldown: 3, // turns
      currentCooldown: 0
    },
    {
      id: 'protection',
      name: 'Coral Protection',
      description: 'Create protective barriers around vulnerable coral reefs',
      energyCost: 15,
      icon: Shield,
      unlocked: true,
      effect: 'Prevents biodiversity loss for 3 turns',
      cooldown: 5,
      currentCooldown: 0
    },
    {
      id: 'blessing',
      name: 'Fishing Blessing',
      description: 'Guide humans to sustainable fishing grounds',
      energyCost: 25,
      icon: Droplets,
      unlocked: true,
      effect: 'Increases human satisfaction by 15%',
      cooldown: 4,
      currentCooldown: 0
    }
  ],
  'Antiquity': [
    {
      id: 'storm',
      name: 'Minor Storm',
      description: 'Create storms to drive away ships from sensitive areas',
      energyCost: 30,
      icon: Wind,
      unlocked: true,
      effect: 'Reduces human activity temporarily',
      cooldown: 4,
      currentCooldown: 0
    },
    {
      id: 'sanctuary',
      name: 'Marine Sanctuary',
      description: 'Establish a protected area where marine life can thrive',
      energyCost: 40,
      icon: Shield,
      unlocked: true,
      effect: 'Creates a safe zone with +20% biodiversity',
      cooldown: 6,
      currentCooldown: 0
    },
    {
      id: 'navigation',
      name: 'Navigation Guidance',
      description: 'Guide human ships to safe routes',
      energyCost: 25,
      icon: Droplets,
      unlocked: true,
      effect: 'Increases human satisfaction by 15%',
      cooldown: 3,
      currentCooldown: 0
    }
  ],
  'Industrial': [
    {
      id: 'cleanse',
      name: 'Cleanse Waters',
      description: 'Remove coal and early industrial pollutants',
      energyCost: 45,
      icon: Droplets,
      unlocked: true,
      effect: 'Reduces pollution by 20%',
      cooldown: 4,
      currentCooldown: 0
    },
    {
      id: 'maelstrom',
      name: 'Maelstrom',
      description: 'Create a powerful whirlpool to sink harmful vessels',
      energyCost: 60,
      icon: Zap,
      unlocked: true,
      effect: 'Reduces human satisfaction by 25%, reduces pollution by 30%',
      cooldown: 8,
      currentCooldown: 0
    },
    {
      id: 'migration',
      name: 'Mass Migration',
      description: 'Guide marine species away from dangerous areas',
      energyCost: 35,
      icon: Wind,
      unlocked: true,
      effect: 'Preserves biodiversity during industrial disasters',
      cooldown: 5,
      currentCooldown: 0
    }
  ],
  'Modern': [
    {
      id: 'kraken',
      name: 'Summon Kraken',
      description: 'Call forth a mythical creature to destroy an oil platform',
      energyCost: 80,
      icon: AlertTriangle,
      unlocked: true,
      effect: 'Drastically reduces pollution, severely impacts human satisfaction',
      cooldown: 10,
      currentCooldown: 0
    },
    {
      id: 'plasticPurge',
      name: 'Plastic Purge',
      description: 'Remove microplastics and debris from a large area',
      energyCost: 50,
      icon: Droplets,
      unlocked: true,
      effect: 'Reduces pollution by 40%',
      cooldown: 6,
      currentCooldown: 0
    },
    {
      id: 'consciousness',
      name: 'Ecological Consciousness',
      description: 'Influence human minds to adopt sustainable practices',
      energyCost: 70,
      icon: Zap,
      unlocked: true,
      effect: 'Gradually improves all metrics over time',
      cooldown: 8,
      currentCooldown: 0
    }
  ]
};

export default function PowersScreen() {
  const [currentAge, setCurrentAge] = useState('Prehistory');
  const [selectedPower, setSelectedPower] = useState(null);
  const [divineEnergy, setDivineEnergy] = useState(100);
  const [powersList, setPowersList] = useState(POWERS);
  const [gameEvent, setGameEvent] = useState(null);
  const [powerHistory, setPowerHistory] = useState([]);

  const handlePowerSelect = (power) => {
    setSelectedPower(power);
  };

  const usePower = () => {
    if (selectedPower && divineEnergy >= selectedPower.energyCost) {
      // Update divine energy
      setDivineEnergy(divineEnergy - selectedPower.energyCost);
      
      // Update power cooldown
      const updatedPowers = {...powersList};
      updatedPowers[currentAge] = updatedPowers[currentAge].map(power => {
        if (power.id === selectedPower.id) {
          return {...power, currentCooldown: power.cooldown};
        }
        return power;
      });
      setPowersList(updatedPowers);
      
      // Add to power history
      const newHistoryEntry = {
        id: Date.now(),
        name: selectedPower.name,
        age: currentAge,
        timestamp: new Date().toLocaleTimeString(),
        energyCost: selectedPower.energyCost
      };
      setPowerHistory([newHistoryEntry, ...powerHistory.slice(0, 4)]);
      
      // Show power activation event
      setGameEvent({
        title: `${selectedPower.name} Activated`,
        description: selectedPower.effect,
        type: 'success'
      });
      
      // Reset selected power
      setSelectedPower(null);
    }
  };
  
  // Simulate power cooldown reduction over time
  useEffect(() => {
    const cooldownTimer = setInterval(() => {
      const updatedPowers = {...powersList};
      let cooldownsUpdated = false;
      
      Object.keys(updatedPowers).forEach(age => {
        updatedPowers[age] = updatedPowers[age].map(power => {
          if (power.currentCooldown > 0) {
            cooldownsUpdated = true;
            return {...power, currentCooldown: power.currentCooldown - 1};
          }
          return power;
        });
      });
      
      if (cooldownsUpdated) {
        setPowersList(updatedPowers);
      }
    }, 5000); // Reduce cooldown every 5 seconds
    
    return () => clearInterval(cooldownTimer);
  }, [powersList]);
  
  // Simulate divine energy regeneration
  useEffect(() => {
    const energyTimer = setInterval(() => {
      if (divineEnergy < 100) {
        setDivineEnergy(prev => Math.min(100, prev + 2));
      }
    }, 10000); // Regenerate 2 energy every 10 seconds
    
    return () => clearInterval(energyTimer);
  }, [divineEnergy]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Divine Powers</Text>
        <View style={styles.energyContainer}>
          <Zap size={20} color="#a855f7" />
          <Text style={styles.energyText}>{divineEnergy}</Text>
        </View>
      </View>
      
      {gameEvent && (
        <GameEvent
          title={gameEvent.title}
          description={gameEvent.description}
          type={gameEvent.type}
          onDismiss={() => setGameEvent(null)}
          duration={3000}
        />
      )}

      <View style={styles.ageSelector}>
        {Object.keys(POWERS).map((age) => (
          <TouchableOpacity
            key={age}
            style={[
              styles.ageButton,
              currentAge === age && styles.ageButtonActive
            ]}
            onPress={() => setCurrentAge(age)}
          >
            <Text style={[
              styles.ageButtonText,
              currentAge === age && styles.ageButtonTextActive
            ]}>
              {age}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.powersContainer}>
        {powersList[currentAge].map((power) => (
          <TouchableOpacity
            key={power.id}
            style={[
              styles.powerCard,
              selectedPower?.id === power.id && styles.powerCardSelected,
              (divineEnergy < power.energyCost || power.currentCooldown > 0) && styles.powerCardDisabled
            ]}
            onPress={() => handlePowerSelect(power)}
            disabled={divineEnergy < power.energyCost || power.currentCooldown > 0}
          >
            <View style={styles.powerIconContainer}>
              <power.icon size={28} color={(divineEnergy >= power.energyCost && power.currentCooldown === 0) ? "#0891b2" : "#64748b"} />
            </View>
            <View style={styles.powerInfo}>
              <Text style={styles.powerName}>{power.name}</Text>
              <Text style={styles.powerDescription}>{power.description}</Text>
              <Text style={styles.powerEffect}>{power.effect}</Text>
              
              {power.currentCooldown > 0 && (
                <View style={styles.cooldownContainer}>
                  <Text style={styles.cooldownText}>Cooldown: {power.currentCooldown}</Text>
                </View>
              )}
            </View>
            <View style={styles.powerCost}>
              <Zap size={16} color="#a855f7" />
              <Text style={styles.powerCostText}>{power.energyCost}</Text>
            </View>
          </TouchableOpacity>
        ))}
        
        {powerHistory.length > 0 && (
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>Recent Power Usage</Text>
            {powerHistory.map(entry => (
              <View key={entry.id} style={styles.historyEntry}>
                <Text style={styles.historyPowerName}>{entry.name}</Text>
                <View style={styles.historyDetails}>
                  <Text style={styles.historyAge}>{entry.age} Age</Text>
                  <Text style={styles.historyTimestamp}>{entry.timestamp}</Text>
                </View>
                <View style={styles.historyCost}>
                  <Zap size={12} color="#a855f7" />
                  <Text style={styles.historyCostText}>{entry.energyCost}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {selectedPower && (
        <View style={styles.selectedPowerPanel}>
          <View style={styles.selectedPowerInfo}>
            <Text style={styles.selectedPowerTitle}>{selectedPower.name}</Text>
            <Text style={styles.selectedPowerDescription}>{selectedPower.description}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.usePowerButton,
              divineEnergy < selectedPower.energyCost && styles.usePowerButtonDisabled
            ]}
            onPress={usePower}
            disabled={divineEnergy < selectedPower.energyCost}
          >
            <Text style={styles.usePowerButtonText}>Use Power</Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#0f172a',
  },
  title: {
    fontFamily: 'PressStart2P',
    fontSize: 18,
    color: '#0891b2',
  },
  energyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  energyText: {
    fontFamily: 'PixelifySans-Bold',
    fontSize: 16,
    color: '#a855f7',
    marginLeft: 6,
  },
  ageSelector: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1e293b',
  },
  ageButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#334155',
    borderRadius: 8,
    marginRight: 8,
  },
  ageButtonActive: {
    backgroundColor: '#0891b2',
  },
  ageButtonText: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 14,
    color: '#94a3b8',
  },
  ageButtonTextActive: {
    color: '#ffffff',
  },
  powersContainer: {
    flex: 1,
    padding: 16,
  },
  powerCard: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  powerCardSelected: {
    borderColor: '#0891b2',
  },
  powerCardDisabled: {
    opacity: 0.6,
  },
  powerIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  powerInfo: {
    flex: 1,
  },
  powerName: {
    fontFamily: 'PixelifySans-SemiBold',
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 4,
  },
  powerDescription: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 6,
  },
  powerEffect: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 14,
    color: '#0891b2',
  },
  cooldownContainer: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  cooldownText: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 12,
    color: '#ef4444',
  },
  powerCost: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  powerCostText: {
    fontFamily: 'PixelifySans-Bold',
    fontSize: 14,
    color: '#a855f7',
    marginLeft: 4,
  },
  selectedPowerPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    padding: 16,
    borderTopWidth: 2,
    borderTopColor: '#0891b2',
  },
  selectedPowerInfo: {
    flex: 1,
  },
  selectedPowerTitle: {
    fontFamily: 'PixelifySans-Bold',
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 4,
  },
  selectedPowerDescription: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: '#94a3b8',
  },
  usePowerButton: {
    backgroundColor: '#0891b2',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 16,
  },
  usePowerButtonDisabled: {
    backgroundColor: '#475569',
  },
  usePowerButtonText: {
    fontFamily: 'PixelifySans-SemiBold',
    fontSize: 14,
    color: '#ffffff',
  },
  historyContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 16,
  },
  historyTitle: {
    fontFamily: 'PixelifySans-Bold',
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 12,
  },
  historyEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  historyPowerName: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 14,
    color: '#0891b2',
    flex: 1,
  },
  historyDetails: {
    flex: 1,
    alignItems: 'center',
  },
  historyAge: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 12,
    color: '#94a3b8',
  },
  historyTimestamp: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 10,
    color: '#64748b',
  },
  historyCost: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  historyCostText: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 12,
    color: '#a855f7',
    marginLeft: 2,
  }
});