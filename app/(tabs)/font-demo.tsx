import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FontDemoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Font Demo</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PressStart2P</Text>
          <Text style={styles.pressStart}>The quick brown fox jumps over the lazy dog.</Text>
          <Text style={styles.pressStart}>0123456789</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pixelify Sans</Text>
          <Text style={styles.pixelifySansRegular}>Regular: The quick brown fox jumps over the lazy dog.</Text>
          <Text style={styles.pixelifySansMedium}>Medium: The quick brown fox jumps over the lazy dog.</Text>
          <Text style={styles.pixelifySansSemiBold}>SemiBold: The quick brown fox jumps over the lazy dog.</Text>
          <Text style={styles.pixelifySansBold}>Bold: The quick brown fox jumps over the lazy dog.</Text>
        </View>
        
        {Platform.OS === 'web' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pixelify Sans Web</Text>
            <Text style={[styles.webFont, { fontWeight: '400' }]}>
              Web Regular (400): The quick brown fox jumps over the lazy dog.
            </Text>
            <Text style={[styles.webFont, { fontWeight: '500' }]}>
              Web Medium (500): The quick brown fox jumps over the lazy dog.
            </Text>
            <Text style={[styles.webFont, { fontWeight: '600' }]}>
              Web SemiBold (600): The quick brown fox jumps over the lazy dog.
            </Text>
            <Text style={[styles.webFont, { fontWeight: '700' }]}>
              Web Bold (700): The quick brown fox jumps over the lazy dog.
            </Text>
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Font Comparison</Text>
          <View style={styles.comparisonContainer}>
            <View style={styles.comparisonColumn}>
              <Text style={styles.comparisonTitle}>Standard Font</Text>
              <Text style={styles.pixelifySansRegular}>Regular</Text>
              <Text style={styles.pixelifySansMedium}>Medium</Text>
              <Text style={styles.pixelifySansSemiBold}>SemiBold</Text>
              <Text style={styles.pixelifySansBold}>Bold</Text>
            </View>
            
            {Platform.OS === 'web' && (
              <View style={styles.comparisonColumn}>
                <Text style={styles.comparisonTitle}>Web Font</Text>
                <Text style={[styles.webFont, { fontWeight: '400' }]}>Regular</Text>
                <Text style={[styles.webFont, { fontWeight: '500' }]}>Medium</Text>
                <Text style={[styles.webFont, { fontWeight: '600' }]}>SemiBold</Text>
                <Text style={[styles.webFont, { fontWeight: '700' }]}>Bold</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0f1d',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#0f172a',
  },
  title: {
    fontFamily: 'PressStart2P',
    fontSize: 18,
    color: '#0891b2',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'PixelifySans-Bold',
    fontSize: 18,
    color: '#e2e8f0',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 8,
  },
  pressStart: {
    fontFamily: 'PressStart2P',
    fontSize: 12,
    color: '#e2e8f0',
    marginBottom: 8,
    lineHeight: 20,
  },
  pixelifySansRegular: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 8,
  },
  pixelifySansMedium: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 8,
  },
  pixelifySansSemiBold: {
    fontFamily: 'PixelifySans-SemiBold',
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 8,
  },
  pixelifySansBold: {
    fontFamily: 'PixelifySans-Bold',
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 8,
  },
  webFont: {
    fontFamily: '"Pixelify Sans", sans-serif',
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 8,
  },
  comparisonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comparisonColumn: {
    flex: 1,
    padding: 8,
    backgroundColor: '#0f172a',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  comparisonTitle: {
    fontFamily: 'PixelifySans-Bold',
    fontSize: 14,
    color: '#0891b2',
    marginBottom: 12,
    textAlign: 'center',
  },
});