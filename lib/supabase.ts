import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://ppldxqqddtwkdlreslnb.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwbGR4cXFkZHR3a2RscmVzbG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwOTgyNTgsImV4cCI6MjA1NjY3NDI1OH0.9edEuWVsmo6ltbSt5seZ5ihreMO_UZVc3RlhILA8J_w';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);