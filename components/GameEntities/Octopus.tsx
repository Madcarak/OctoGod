import React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence 
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

interface OctopusProps {
  onMove?: (x: number, y: number) => void;
  onPowerActivate?: () => void;
}

export default function Octopus({ onMove, onPowerActivate }: OctopusProps) {
  // Animation values
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const translateX = useSharedValue(width * 0.4);
  const translateY = useSharedValue(height * 0.2);
  
  // Set up animations
  React.useEffect(() => {
    // Gentle rotation animation
    rotation.value = withRepeat(withSequence(
      withTiming(-5, { duration: 2000 }),
      withTiming(5, { duration: 2000 })
    ), -1, true);
    
    // Breathing effect
    scale.value = withRepeat(withSequence(
      withTiming(1.05, { duration: 1500 }),
      withTiming(0.95, { duration: 1500 })
    ), -1, true);
  }, []);

  // Pan gesture for moving the octopus
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.absoluteX - 40; // Center offset
      translateY.value = event.absoluteY - 40; // Center offset
      
      if (onMove) {
        onMove(translateX.value, translateY.value);
      }
    })
    .onEnd(() => {
      // Optional: Add a small animation when releasing
      scale.value = withSequence(
        withTiming(1.2, { duration: 200 }),
        withTiming(1, { duration: 300 })
      );
      
      if (onPowerActivate) {
        onPowerActivate();
      }
    });

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation.value}deg` },
        { scale: scale.value }
      ],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.Image
        source={{ uri: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?q=80&w=1000&auto=format&fit=crop' }}
        style={[styles.octopus, animatedStyle]}
      />
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  octopus: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
  },
});