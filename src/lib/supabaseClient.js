import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://awtvmejexawazuoyxozo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3dHZtZWpleGF3YXp1b3l4b3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5MDY1MzksImV4cCI6MjEwNDQ4MjUzOX0.tzIaJr1t8FdXFxVd-XYWb_saBnmo7ElYldE_TKnMG10';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
