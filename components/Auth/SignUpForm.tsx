import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from './AuthProvider';

interface SignUpFormProps {
  onToggleForm: () => void;
}

export default function SignUpForm({ onToggleForm }: SignUpFormProps) {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await signUp(email, password, username || undefined);
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="#64748b"
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username (Optional)</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Choose a username"
          placeholderTextColor="#64748b"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password *</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Create a password"
          placeholderTextColor="#64748b"
          secureTextEntry
        />
        <Text style={styles.helperText}>Must be at least 6 characters</Text>
      </View>
      
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={onToggleForm}>
          <Text style={styles.footerLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontFamily: 'PixelifySans-Bold',
    fontSize: 24,
    color: '#0891b2',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#7f1d1d',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 14,
    color: '#fecaca',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 14,
    color: '#e2e8f0',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 12,
    color: '#e2e8f0',
    fontFamily: 'PixelifySans-Regular',
    fontSize: 16,
  },
  helperText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#0891b2',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontFamily: 'PixelifySans-SemiBold',
    fontSize: 16,
    color: '#ffffff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontFamily: 'PixelifySans-Regular',
    fontSize: 14,
    color: '#94a3b8',
    marginRight: 6,
  },
  footerLink: {
    fontFamily: 'PixelifySans-Medium',
    fontSize: 14,
    color: '#0891b2',
  },
});