import { createBrowserClient } from '@supabase/ssr';
import { createMockSupabaseClient } from './mock-client';

export function createClient() {
  // Use mock client if Supabase credentials are not available
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.log('Using mock Supabase client for testing');
    return createMockSupabaseClient();
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
