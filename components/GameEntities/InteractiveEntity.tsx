import React, { useEffect, useRef } from 'react';
import { StyleSheet, Image, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';

const { width } = Dimensions.get('window');

interface InteractiveEntityProps {
  type: 'fish' | 'ship' | 'coral' | 'pollution';
  position: { x: number, y: number };
  size?: number;
  onInteract?: () => void;
  imageUrl: string;
}

export default function InteractiveEntity({ 
  type, 
  position, 
  size = 40, 
  onInteract,
  imageUrl
}: InteractiveEntityProps) {
  // Animation values
  const scale = useRef(new Animated.Value(1)).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(position.x)).current;
  const translateY = useRef(new Animated.Value(position.y)).current;
  
  // Set up animations based on entity type
  useEffect(() => {
    switch (type) {
      case 'fish':
        // Fish swim with a slight wobble
        Animated.loop(
          Animated.sequence([
            Animated.timing(rotation, {
              toValue: -5,
              duration: 1000,
              easing: Easing.sin,
              useNativeDriver: true
            }),
            Animated.timing(rotation, {
              toValue: 5,
              duration: 1000,
              easing: Easing.sin,
              useNativeDriver: true
            })
          ])
        ).start();
        
        // Random movement
        const randomMovement = () => {
          const newX = Math.max(0, Math.min(width * 3 - size, position.x + (Math.random() * 200 - 100)));
          Animated.timing(translateX, {
            toValue: newX,
            duration: 5000,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true
          }).start();
          
          setTimeout(randomMovement, 5000);
        };
        
        randomMovement();
        break;
        
      case 'ship':
        // Ships move steadily
        Animated.loop(
          Animated.sequence([
            Animated.timing(translateX, {
              toValue: position.x + 150,
              duration: 8000,
              easing: Easing.linear,
              useNativeDriver: true
            }),
            Animated.timing(translateX, {
              toValue: position.x - 150,
              duration: 8000,
              easing: Easing.linear,
              useNativeDriver: true
            })
          ])
        ).start();
        break;
        
      case 'coral':
        // Corals sway gently
        Animated.loop(
          Animated.sequence([
            Animated.timing(rotation, {
              toValue: -2,
              duration: 2000,
              easing: Easing.sin,
              useNativeDriver: true
            }),
            Animated.timing(rotation, {
              toValue: 2,
              duration: 2000,
              easing: Easing.sin,
              useNativeDriver: true
            })
          ])
        ).start();
        
        Animated.loop(
          Animated.sequence([
            Animated.timing(scale, {
              toValue: 1.05,
              duration: 3000,
              easing: Easing.sin,
              useNativeDriver: true
            }),
            Animated.timing(scale, {
              toValue: 0.95,
              duration: 3000,
              easing: Easing.sin,
              useNativeDriver: true
            })
          ])
        ).start();
        break;
        
      case 'pollution':
        // Pollution pulses
        Animated.loop(
          Animated.sequence([
            Animated.timing(scale, {
              toValue: 1.1,
              duration: 1500,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true
            }),
            Animated.timing(scale, {
              toValue: 0.9,
              duration: 1500,
              easing: Easing.in(Easing.quad),
              useNativeDriver: true
            })
          ])
        ).start();
        break;
    }
  }, []);
  
  // Interaction animation
  const handlePress = () => {
    // Quick pulse animation on interaction
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.3,
        duration: 150,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 150,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true
      })
    ]).start();
    
    if (onInteract) {
      onInteract();
    }
  };
  
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Animated.Image
        source={{ uri: imageUrl }}
        style={[
          styles.entity,
          { 
            width: size, 
            height: size, 
            borderRadius: size / 2,
            transform: [
              { translateX },
              { translateY },
              { rotate: rotation.interpolate({
                inputRange: [-5, 5],
                outputRange: ['-5deg', '5deg']
              }) },
              { scale }
            ]
          }
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  entity: {
    position: 'absolute',
    zIndex: 5, // Make sure entities are above the background but below the octopus
  },
});