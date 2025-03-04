import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, Animated, PanResponder } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Info, CircleAlert as AlertCircle } from 'lucide-react-native';

// Import custom components
import GameEvent from '../../components/GameEntities/GameEvent';
import InteractiveEntity from '../../components/GameEntities/InteractiveEntity';
import GameMetric from '../../components/UI/GameMetric';

// Game constants
const AGES = ['Prehistory', 'Antiquity', 'Industrial', 'Modern'];
const ECOSYSTEMS = {
  'Prehistory': {
    biodiversity: 100,
    pollution: 0,
    humanSatisfaction: 70,
    description: 'Humans live in harmony with nature. Guide them to avoid overfishing key species.',
    threats: ['Basic fishing', 'Small settlements'],
    image: 'https://images.unsplash.com/photo-1589634749000-1e72e2c8b8a9?q=80&w=3000&auto=format&fit=crop',
    entities: [
      { type: 'fish', position: { x: 100, y: 150 }, imageUrl: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=200&auto=format&fit=crop' },
      { type: 'fish', position: { x: 250, y: 180 }, imageUrl: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=200&auto=format&fit=crop' },
      { type: 'coral', position: { x: 180, y: 220 }, imageUrl: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=200&auto=format&fit=crop' }
    ]
  },
  'Antiquity': {
    biodiversity: 90,
    pollution: 10,
    humanSatisfaction: 75,
    description: 'Navigation begins, with fishermen and small merchant fleets. Monitor coastal ecosystems.',
    threats: ['Fishing fleets', 'Coastal settlements', 'Early trade routes'],
    image: 'https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?q=80&w=2070&auto=format&fit=crop',
    entities: [
      { type: 'fish', position: { x: 120, y: 160 }, imageUrl: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=200&auto=format&fit=crop' },
      { type: 'ship', position: { x: 280, y: 120 }, imageUrl: 'https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?q=80&w=200&auto=format&fit=crop' },
      { type: 'coral', position: { x: 200, y: 240 }, imageUrl: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=200&auto=format&fit=crop' }
    ]
  },
  'Industrial': {
    biodiversity: 70,
    pollution: 40,
    humanSatisfaction: 80,
    description: 'Steam-powered ships emerge, along with overfishing, coal spills, and early pollutants.',
    threats: ['Steam ships', 'Coal pollution', 'Intensive fishing'],
    image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=2070&auto=format&fit=crop',
    entities: [
      { type: 'ship', position: { x: 150, y: 130 }, imageUrl: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=200&auto=format&fit=crop' },
      { type: 'pollution', position: { x: 220, y: 180 }, imageUrl: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=200&auto=format&fit=crop' },
      { type: 'fish', position: { x: 300, y: 200 }, imageUrl: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=200&auto=format&fit=crop' }
    ]
  },
  'Modern': {
    biodiversity: 50,
    pollution: 70,
    humanSatisfaction: 85,
    description: 'Oil platforms, industrial fishing, and plastic pollution jeopardize the entire ecosystem.',
    threats: ['Oil platforms', 'Plastic pollution', 'Industrial fishing', 'Climate change'],
    image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=1974&auto=format&fit=crop',
    entities: [
      { type: 'pollution', position: { x: 120, y: 150 }, imageUrl: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=200&auto=format&fit=crop' },
      { type: 'pollution', position: { x: 250, y: 180 }, imageUrl: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=200&auto=format&fit=crop' },
      { type: 'ship', position: { x: 180, y: 120 }, imageUrl: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=200&auto=format&fit=crop' }
    ]
  }
};

// Custom panoramic ocean background
const CUSTOM_PANORAMIC = {
  'Prehistory': 'https://github.com/madcarak/octogod-game/raw/main/assets/images/Background_prehistoric.png',
  'Antiquity': 'https://github.com/madcarak/octogod-game/raw/main/assets/images/Background_prehistoric.png',
  'Industrial': 'https://github.com/madcarak/octogod-game/raw/main/assets/images/Background_prehistoric.png',
  'Modern': 'https://github.com/madcarak/octogod-game/raw/main/assets/images/Background_prehistoric.png'
};

export default function OceanScreen() {
  const [currentAge, setCurrentAge] = useState('Prehistory');
  const [showInfo, setShowInfo] = useState(false);
  const [gameEvent, setGameEvent] = useState(null);
  const [previousStats, setPreviousStats] = useState({
    biodiversity: ECOSYSTEMS[currentAge].biodiversity,
    pollution: ECOSYSTEMS[currentAge].pollution,
    humanSatisfaction: ECOSYSTEMS[currentAge].humanSatisfaction,
    divineEnergy: 100
  });
  const [gameStats, setGameStats] = useState({
    biodiversity: ECOSYSTEMS[currentAge].biodiversity,
    pollution: ECOSYSTEMS[currentAge].pollution,
    humanSatisfaction: ECOSYSTEMS[currentAge].humanSatisfaction,
    divineEnergy: 100
  });

  // Animation values using React Native's Animated
  const { width, height } = Dimensions.get('window');
  const scrollX = useRef(new Animated.Value(0)).current;
  const backgroundWidth = width * 3; // 3x screen width for panoramic effect
  const maxScroll = backgroundWidth - width;
  
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const octopusPosition = useRef(new Animated.ValueXY({ x: width * 0.4, y: height * 0.2 })).current;
  
  // Set up animations
  useEffect(() => {
    // Rotation animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotation, {
          toValue: 10,
          duration: 2000,
          useNativeDriver: true
        }),
        Animated.timing(rotation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true
        })
      ])
    ).start();
    
    // Scale animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true
        })
      ])
    ).start();
  }, []);

  // Pan responder for the background
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Update scroll position based on drag
        const newScrollX = Math.max(0, Math.min(maxScroll, scrollX._value - gestureState.dx));
        scrollX.setValue(newScrollX);
      },
      onPanResponderRelease: () => {
        // Optional: Add momentum effect here if desired
      }
    })
  ).current;

  // Pan responder for the octopus
  const octopusPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Move the octopus with the gesture
        octopusPosition.setValue({
          x: gestureState.moveX - 40, // Center offset
          y: gestureState.moveY - 40  // Center offset
        });
      }
    })
  ).current;

  // Update game stats when age changes
  useEffect(() => {
    setPreviousStats(gameStats);
    setGameStats({
      biodiversity: ECOSYSTEMS[currentAge].biodiversity,
      pollution: ECOSYSTEMS[currentAge].pollution,
      humanSatisfaction: ECOSYSTEMS[currentAge].humanSatisfaction,
      divineEnergy: gameStats.divineEnergy
    });
    
    // Show age transition event
    setGameEvent({
      title: `${currentAge} Age Begins`,
      description: ECOSYSTEMS[currentAge].description,
      type: 'info'
    });
    
    // Reset scroll position when changing ages
    scrollX.setValue(0);
  }, [currentAge]);

  const changeAge = (age) => {
    setCurrentAge(age);
  };
  
  const handleEntityInteraction = (type) => {
    let newStats = {...gameStats};
    let eventData = null;
    
    switch (type) {
      case 'fish':
        newStats.biodiversity = Math.min(100, gameStats.biodiversity + 5);
        newStats.divineEnergy = Math.min(100, gameStats.divineEnergy + 2);
        eventData = {
          title: 'Fish Population Thriving',
          description: 'You have helped increase the fish population in this area.',
          type: 'success'
        };
        break;
        
      case 'ship':
        newStats.humanSatisfaction = Math.min(100, gameStats.humanSatisfaction + 5);
        newStats.pollution = Math.min(100, gameStats.pollution + 2);
        eventData = {
          title: 'Human Activity Increased',
          description: 'Human satisfaction has increased, but so has pollution.',
          type: 'info'
        };
        break;
        
      case 'coral':
        newStats.biodiversity = Math.min(100, gameStats.biodiversity + 8);
        newStats.divineEnergy = Math.min(100, gameStats.divineEnergy + 5);
        eventData = {
          title: 'Coral Reef Flourishing',
          description: 'The coral reef is now a thriving ecosystem for marine life.',
          type: 'success'
        };
        break;
        
      case 'pollution':
        newStats.pollution = Math.max(0, gameStats.pollution - 10);
        newStats.divineEnergy = Math.max(0, gameStats.divineEnergy - 5);
        eventData = {
          title: 'Pollution Reduced',
          description: 'You have cleansed the waters, but it cost divine energy.',
          type: 'warning'
        };
        break;
    }
    
    setPreviousStats(gameStats);
    setGameStats(newStats);
    
    if (eventData) {
      setGameEvent(eventData);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>OctoGod</Text>
        <Text style={styles.subtitle}>Age: {currentAge}</Text>
        <TouchableOpacity 
          style={styles.infoButton} 
          onPress={() => setShowInfo(!showInfo)}
        >
          <Info size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {showInfo && (
        <View style={styles.infoPanel}>
          <Text style={styles.infoPanelTitle}>{currentAge} Age</Text>
          <Text style={styles.infoPanelDescription}>{ECOSYSTEMS[currentAge].description}</Text>
          <Text style={styles.infoPanelSubtitle}>Current Threats:</Text>
          {ECOSYSTEMS[currentAge].threats.map((threat, index) => (
            <View key={index} style={styles.threatItem}>
              <AlertCircle size={16} color="#ef4444" />
              <Text style={styles.threatText}>{threat}</Text>
            </View>
          ))}
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => setShowInfo(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {gameEvent && (
        <GameEvent
          title={gameEvent.title}
          description={gameEvent.description}
          type={gameEvent.type}
          onDismiss={() => setGameEvent(null)}
          duration={5000}
        />
      )}

      <View style={styles.gameArea} {...panResponder.panHandlers}>
        <Animated.View 
          style={[
            styles.panoramicContainer, 
            { transform: [{ translateX: scrollX.interpolate({
              inputRange: [0, maxScroll],
              outputRange: [0, -maxScroll],
              extrapolate: 'clamp'
            }) }] }
          ]}
        >
          <Image
            source={{ uri: CUSTOM_PANORAMIC[currentAge] }}
            style={styles.panoramicBackground}
            resizeMode="cover"
          />
          
          {/* Interactive entities */}
          {ECOSYSTEMS[currentAge].entities.map((entity, index) => (
            <InteractiveEntity
              key={index}
              type={entity.type}
              position={{
                x: entity.position.x + Math.random() * 300, // Spread entities across panorama
                y: entity.position.y
              }}
              imageUrl={entity.imageUrl}
              onInteract={() => handleEntityInteraction(entity.type)}
            />
          ))}
        </Animated.View>
        
        <Animated.Image
          source={{ uri: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?q=80&w=1000&auto=format&fit=crop' }}
          style={[
            styles.octopus,
            {
              transform: [
                { translateX: octopusPosition.x },
                { translateY: octopusPosition.y },
                { rotate: rotation.interpolate({
                  inputRange: [0, 10],
                  outputRange: ['0deg', '10deg']
                }) },
                { scale: scale }
              ]
            }
          ]}
          {...octopusPanResponder.panHandlers}
        />
      </View>

      <View style={styles.statsContainer}>
        <GameMetric
          label="Biodiversity"
          value={gameStats.biodiversity}
          previousValue={previousStats.biodiversity}
          maxValue={100}
          color="#22c55e"
        />
        
        <GameMetric
          label="Pollution"
          value={gameStats.pollution}
          previousValue={previousStats.pollution}
          maxValue={100}
          color="#ef4444"
        />
        
        <GameMetric
          label="Human Satisfaction"
          value={gameStats.humanSatisfaction}
          previousValue={previousStats.humanSatisfaction}
          maxValue={100}
          color="#3b82f6"
        />
        
        <GameMetric
          label="Divine Energy"
          value={gameStats.divineEnergy}
          previousValue={previousStats.divineEnergy}
          maxValue={100}
          color="#a855f7"
        />
      </View>

      <ScrollView horizontal style={styles.ageSelector} showsHorizontalScrollIndicator={false}>
        {AGES.map((age) => (
          <TouchableOpacity
            key={age}
            style={[
              styles.ageButton,
              currentAge === age && styles.ageButtonActive
            ]}
            onPress={() => changeAge(age)}
          >
            <Text style={[
              styles.ageButtonText,
              currentAge === age && styles.ageButtonTextActive
            ]}>
              {age}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.instructionsOverlay}>
        <Text style={styles.instructionsText}>
          Drag to explore the ocean • Interact with marine life
        </Text>
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');

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
    paddingVertical: 10,
    backgroundColor: '#0f172a',
  },
  title: {
    fontFamily: 'PressStart2P',
    fontSize: 18,
    color: '#0891b2',
  },
  subtitle: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 16,
    color: '#e2e8f0',
  },
  infoButton: {
    padding: 8,
  },
  infoPanel: {
    position: 'absolute',
    top: 80,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderRadius: 12,
    padding: 16,
    zIndex: 10,
    borderWidth: 2,
    borderColor: '#0891b2',
  },
  infoPanelTitle: {
    fontFamily: 'PixelifySans-Bold',
    fontSize: 18,
    color: '#0891b2',
    marginBottom: 8,
  },
  infoPanelDescription: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: '#e2e8f0',
    marginBottom: 12,
    lineHeight: 20,
  },
  infoPanelSubtitle: {
    fontFamily: 'PixelifySans-SemiBold',
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 8,
  },
  threatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  threatText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: '#e2e8f0',
    marginLeft: 8,
  },
  closeButton: {
    backgroundColor: '#0891b2',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  closeButtonText: {
    fontFamily: 'PixelifySans-SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  gameArea: {
    height: height * 0.4,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#0f172a', // Add background color to be visible while image loads
  },
  panoramicContainer: {
    width: width * 3, // 3x screen width for panoramic effect
    height: '100%',
    position: 'absolute',
  },
  panoramicBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  octopus: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    zIndex: 10, // Ensure octopus is above other elements
  },
  statsContainer: {
    padding: 16,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    margin: 16,
  },
  ageSelector: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  ageButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#1e293b',
    borderRadius: 8,
    marginRight: 10,
  },
  ageButtonActive: {
    backgroundColor: '#0891b2',
  },
  ageButtonText: {
    fontFamily: 'PixelifySans-SemiBold',
    fontSize: 14,
    color: '#94a3b8',
  },
  ageButtonTextActive: {
    color: '#ffffff',
  },
  instructionsOverlay: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    paddingVertical: 8,
  },
  instructionsText: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 14,
    color: '#e2e8f0',
    textAlign: 'center',
  },
});