import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AlertCircle } from 'lucide-react-native';

interface InfoPanelProps {
  title: string;
  description: string;
  threats: string[];
  onClose: () => void;
}

export default function InfoPanel({ title, description, threats, onClose }: InfoPanelProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.subtitle}>Current Threats:</Text>
      {threats.map((threat, index) => (
        <View key={index} style={styles.threatItem}>
          <AlertCircle size={16} color="#ef4444" />
          <Text style={styles.threatText}>{threat}</Text>
        </View>
      ))}
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={onClose}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontFamily: 'PixelifySans-Bold',
    fontSize: 18,
    color: '#0891b2',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: '#e2e8f0',
    marginBottom: 12,
    lineHeight: 20,
  },
  subtitle: {
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
});