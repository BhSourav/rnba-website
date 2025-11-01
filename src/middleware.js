import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request) {
  // Update Supabase session
  const supabaseResponse = await updateSession(request);
  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api/(?!auth)).*)',
  ],
};
