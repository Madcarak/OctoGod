import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface AgeSelectorProps {
  ages: string[];
  currentAge: string;
  onAgeChange: (age: string) => void;
}

export default function AgeSelector({ ages, currentAge, onAgeChange }: AgeSelectorProps) {
  return (
    <ScrollView 
      horizontal 
      style={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      {ages.map((age) => (
        <TouchableOpacity
          key={age}
          style={[
            styles.ageButton,
            currentAge === age && styles.ageButtonActive
          ]}
          onPress={() => onAgeChange(age)}
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
  );
}

const styles = StyleSheet.create({
  container: {
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
});