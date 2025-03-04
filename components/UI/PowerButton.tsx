import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Zap } from 'lucide-react-native';

interface PowerButtonProps {
  name: string;
  energyCost: number;
  isActive?: boolean;
  isDisabled?: boolean;
  onPress: () => void;
  icon: React.ReactNode;
}

export default function PowerButton({
  name,
  energyCost,
  isActive = false,
  isDisabled = false,
  onPress,
  icon
}: PowerButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isActive && styles.containerActive,
        isDisabled && styles.containerDisabled
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={[
        styles.name,
        isActive && styles.nameActive,
        isDisabled && styles.nameDisabled
      ]}>
        {name}
      </Text>
      <View style={styles.costContainer}>
        <Zap size={14} color={isDisabled ? "#64748b" : "#a855f7"} />
        <Text style={[
          styles.cost,
          isDisabled && styles.costDisabled
        ]}>
          {energyCost}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: 10,
  },
  containerActive: {
    borderColor: '#0891b2',
    backgroundColor: '#164e63',
  },
  containerDisabled: {
    opacity: 0.6,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  name: {
    fontFamily: 'PixelifySans-SemiBold',
    fontSize: 14,
    color: '#e2e8f0',
    marginBottom: 8,
    textAlign: 'center',
  },
  nameActive: {
    color: '#ffffff',
  },
  nameDisabled: {
    color: '#64748b',
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cost: {
    fontFamily: 'PixelifySans-Bold',
    fontSize: 12,
    color: '#a855f7',
    marginLeft: 4,
  },
  costDisabled: {
    color: '#64748b',
  },
});