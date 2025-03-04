import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatusBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  showPercentage?: boolean;
}

export default function StatusBar({ 
  label, 
  value, 
  maxValue, 
  color, 
  showPercentage = true 
}: StatusBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.barContainer}>
        <View 
          style={[
            styles.bar, 
            { width: `${percentage}%`, backgroundColor: color }
          ]} 
        />
      </View>
      {showPercentage && (
        <Text style={styles.value}>{Math.round(percentage)}%</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 14,
    color: '#e2e8f0',
    marginBottom: 4,
  },
  barContainer: {
    height: 12,
    backgroundColor: '#334155',
    borderRadius: 6,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 6,
  },
  value: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'right',
    marginTop: 2,
  },
});