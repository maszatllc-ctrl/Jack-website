import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://knwfntbcjtusxzzdzryj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud2ZudGJjanR1c3h6emR6cnlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyNTMxMDAsImV4cCI6MjA3ODgyOTEwMH0.rkRVAKcvibT-wsfS8jVCZE7uh7WoaMn6zlad9gatlms';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
