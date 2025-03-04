import { supabase } from './supabase';

// Types
export interface PlayerProfile {
  id: string;
  user_id: string;
  username: string | null;
  created_at: string;
  updated_at: string;
}

export interface GameProgress {
  id: string;
  player_id: string;
  current_age: string;
  biodiversity: number;
  pollution: number;
  human_satisfaction: number;
  divine_energy: number;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  player_id: string;
  achievement_id: string;
  unlocked: boolean;
  progress: number;
  unlocked_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PowerUsage {
  id: string;
  player_id: string;
  power_id: string;
  used_at: string;
  age: string;
  energy_cost: number;
  created_at: string;
}

// Functions to interact with the database
export async function createPlayerProfile(userId: string, username?: string): Promise<PlayerProfile | null> {
  const { data, error } = await supabase
    .from('player_profiles')
    .insert([
      { user_id: userId, username }
    ])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating player profile:', error);
    return null;
  }
  
  return data;
}

export async function getPlayerProfile(userId: string): Promise<PlayerProfile | null> {
  const { data, error } = await supabase
    .from('player_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching player profile:', error);
    return null;
  }
  
  return data;
}

export async function createInitialGameProgress(playerId: string): Promise<GameProgress | null> {
  const { data, error } = await supabase
    .from('game_progress')
    .insert([
      { player_id: playerId }
    ])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating game progress:', error);
    return null;
  }
  
  return data;
}

export async function getGameProgress(playerId: string): Promise<GameProgress | null> {
  const { data, error } = await supabase
    .from('game_progress')
    .select('*')
    .eq('player_id', playerId)
    .single();
  
  if (error) {
    console.error('Error fetching game progress:', error);
    return null;
  }
  
  return data;
}

export async function updateGameProgress(
  progressId: string, 
  updates: Partial<GameProgress>
): Promise<GameProgress | null> {
  const { data, error } = await supabase
    .from('game_progress')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', progressId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating game progress:', error);
    return null;
  }
  
  return data;
}

export async function createAchievement(
  playerId: string,
  achievementId: string,
  progress: number = 0,
  unlocked: boolean = false
): Promise<Achievement | null> {
  const { data, error } = await supabase
    .from('achievements')
    .insert([
      { 
        player_id: playerId, 
        achievement_id: achievementId,
        progress,
        unlocked,
        unlocked_at: unlocked ? new Date().toISOString() : null
      }
    ])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating achievement:', error);
    return null;
  }
  
  return data;
}

export async function updateAchievement(
  achievementId: string,
  progress: number,
  unlocked: boolean = false
): Promise<Achievement | null> {
  const updates: any = { 
    progress, 
    updated_at: new Date().toISOString() 
  };
  
  if (unlocked) {
    updates.unlocked = true;
    updates.unlocked_at = new Date().toISOString();
  }
  
  const { data, error } = await supabase
    .from('achievements')
    .update(updates)
    .eq('id', achievementId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating achievement:', error);
    return null;
  }
  
  return data;
}

export async function getAchievements(playerId: string): Promise<Achievement[] | null> {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('player_id', playerId);
  
  if (error) {
    console.error('Error fetching achievements:', error);
    return null;
  }
  
  return data;
}

export async function recordPowerUsage(
  playerId: string,
  powerId: string,
  age: string,
  energyCost: number
): Promise<PowerUsage | null> {
  const { data, error } = await supabase
    .from('power_usage')
    .insert([
      { 
        player_id: playerId, 
        power_id: powerId,
        age,
        energy_cost: energyCost
      }
    ])
    .select()
    .single();
  
  if (error) {
    console.error('Error recording power usage:', error);
    return null;
  }
  
  return data;
}

export async function getPowerUsageHistory(playerId: string, limit: number = 5): Promise<PowerUsage[] | null> {
  const { data, error } = await supabase
    .from('power_usage')
    .select('*')
    .eq('player_id', playerId)
    .order('used_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching power usage history:', error);
    return null;
  }
  
  return data;
}