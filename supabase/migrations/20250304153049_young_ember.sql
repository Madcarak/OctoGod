/*
  # Create game data tables

  1. New Tables
    - `player_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `username` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `game_progress`
      - `id` (uuid, primary key)
      - `player_id` (uuid, references player_profiles)
      - `current_age` (text)
      - `biodiversity` (integer)
      - `pollution` (integer)
      - `human_satisfaction` (integer)
      - `divine_energy` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `achievements`
      - `id` (uuid, primary key)
      - `player_id` (uuid, references player_profiles)
      - `achievement_id` (text)
      - `unlocked` (boolean)
      - `progress` (integer)
      - `unlocked_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `power_usage`
      - `id` (uuid, primary key)
      - `player_id` (uuid, references player_profiles)
      - `power_id` (text)
      - `used_at` (timestamp)
      - `age` (text)
      - `energy_cost` (integer)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read/write their own data
*/

-- Create player_profiles table
CREATE TABLE IF NOT EXISTS player_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  username text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create game_progress table
CREATE TABLE IF NOT EXISTS game_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES player_profiles NOT NULL,
  current_age text DEFAULT 'Prehistory',
  biodiversity integer DEFAULT 100,
  pollution integer DEFAULT 0,
  human_satisfaction integer DEFAULT 70,
  divine_energy integer DEFAULT 100,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES player_profiles NOT NULL,
  achievement_id text NOT NULL,
  unlocked boolean DEFAULT false,
  progress integer DEFAULT 0,
  unlocked_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(player_id, achievement_id)
);

-- Create power_usage table
CREATE TABLE IF NOT EXISTS power_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES player_profiles NOT NULL,
  power_id text NOT NULL,
  used_at timestamptz DEFAULT now(),
  age text NOT NULL,
  energy_cost integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE player_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE power_usage ENABLE ROW LEVEL SECURITY;

-- Create policies for player_profiles
CREATE POLICY "Users can read their own profile"
  ON player_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON player_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON player_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for game_progress
CREATE POLICY "Users can read their own game progress"
  ON game_progress
  FOR SELECT
  TO authenticated
  USING (player_id IN (SELECT id FROM player_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert their own game progress"
  ON game_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (player_id IN (SELECT id FROM player_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own game progress"
  ON game_progress
  FOR UPDATE
  TO authenticated
  USING (player_id IN (SELECT id FROM player_profiles WHERE user_id = auth.uid()));

-- Create policies for achievements
CREATE POLICY "Users can read their own achievements"
  ON achievements
  FOR SELECT
  TO authenticated
  USING (player_id IN (SELECT id FROM player_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert their own achievements"
  ON achievements
  FOR INSERT
  TO authenticated
  WITH CHECK (player_id IN (SELECT id FROM player_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own achievements"
  ON achievements
  FOR UPDATE
  TO authenticated
  USING (player_id IN (SELECT id FROM player_profiles WHERE user_id = auth.uid()));

-- Create policies for power_usage
CREATE POLICY "Users can read their own power usage"
  ON power_usage
  FOR SELECT
  TO authenticated
  USING (player_id IN (SELECT id FROM player_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert their own power usage"
  ON power_usage
  FOR INSERT
  TO authenticated
  WITH CHECK (player_id IN (SELECT id FROM player_profiles WHERE user_id = auth.uid()));