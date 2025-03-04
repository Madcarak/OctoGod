import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react-native';

interface GameMetricProps {
  label: string;
  value: number;
  previousValue: number;
  maxValue: number;
  color: string;
  showPercentage?: boolean;
  showTrend?: boolean;
}

export default function GameMetric({ 
  label, 
  value, 
  previousValue,
  maxValue, 
  color, 
  showPercentage = true,
  showTrend = true
}: GameMetricProps) {
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));
  
  // Calculate trend
  const getTrend = () => {
    const diff = value - previousValue;
    if (Math.abs(diff) < 0.5) return 'stable';
    return diff > 0 ? 'up' : 'down';
  };
  
  const trend = getTrend();
  
  // Get trend icon and color
  const renderTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={14} color="#22c55e" />;
      case 'down':
        return <TrendingDown size={14} color="#ef4444" />;
      case 'stable':
      default:
        return <Minus size={14} color="#94a3b8" />;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {showTrend && (
          <View style={styles.trendContainer}>
            {renderTrendIcon()}
          </View>
        )}
      </View>
      
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
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 14,
    color: '#e2e8f0',
  },
  trendContainer: {
    backgroundColor: '#0f172a',
    borderRadius: 4,
    padding: 2,
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