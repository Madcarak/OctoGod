import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignInForm from '../components/Auth/SignInForm';
import SignUpForm from '../components/Auth/SignUpForm';
import { AuthProvider } from '../components/Auth/AuthProvider';

export default function AuthScreen() {
  const [showSignIn, setShowSignIn] = useState(true);

  const toggleForm = () => {
    setShowSignIn(!showSignIn);
  };

  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>OctoGod</Text>
            <Text style={styles.subtitle}>Divine Guardian of the Oceans</Text>
          </View>
          
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?q=80&w=1000&auto=format&fit=crop' }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          
          <View style={styles.formContainer}>
            {showSignIn ? (
              <SignInForm onToggleForm={toggleForm} />
            ) : (
              <SignUpForm onToggleForm={toggleForm} />
            )}
          </View>
          
          <Text style={styles.footerText}>
            Become the divine octopus guardian and guide humanity through the ages
          </Text>
        </View>
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0f1d',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'PressStart2P',
    fontSize: 28,
    color: '#0891b2',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 18,
    color: '#e2e8f0',
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#0891b2',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 24,
  },
  footerText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    maxWidth: 300,
  },
});