import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { TriangleAlert as AlertTriangle, Info, X } from 'lucide-react-native';

interface GameEventProps {
  title: string;
  description: string;
  type: 'warning' | 'info' | 'success';
  onDismiss: () => void;
  duration?: number; // Auto-dismiss after duration (ms), if provided
}

export default function GameEvent({ 
  title, 
  description, 
  type, 
  onDismiss,
  duration
}: GameEventProps) {
  const [animation] = useState(new Animated.Value(0));
  
  useEffect(() => {
    // Animate in
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    // Auto-dismiss if duration is provided
    if (duration) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleDismiss = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onDismiss();
    });
  };
  
  // Get icon and colors based on type
  const getEventStyles = () => {
    switch (type) {
      case 'warning':
        return {
          icon: <AlertTriangle size={24} color="#f59e0b" />,
          backgroundColor: '#7c2d12',
          borderColor: '#f59e0b'
        };
      case 'success':
        return {
          icon: <Info size={24} color="#10b981" />,
          backgroundColor: '#064e3b',
          borderColor: '#10b981'
        };
      case 'info':
      default:
        return {
          icon: <Info size={24} color="#0891b2" />,
          backgroundColor: '#0f172a',
          borderColor: '#0891b2'
        };
    }
  };
  
  const eventStyles = getEventStyles();
  
  return (
    <Animated.View 
      style={[
        styles.container,
        {
          backgroundColor: eventStyles.backgroundColor,
          borderColor: eventStyles.borderColor,
          opacity: animation,
          transform: [
            { 
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0]
              })
            }
          ]
        }
      ]}
    >
      <View style={styles.iconContainer}>
        {eventStyles.icon}
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.closeButton}
        onPress={handleDismiss}
      >
        <X size={18} color="#94a3b8" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 1000,
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'PixelifySans-Bold',
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 4,
  },
  description: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: '#cbd5e1',
  },
  closeButton: {
    padding: 4,
    justifyContent: 'center',
  },
});