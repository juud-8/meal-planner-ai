// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: Record<string, unknown>) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (_error) {
            // The `cookies()` may not be readable yet in a Server Component.
            // This error can be ignored if you are only setting cookies in a Server Action
            // or Route Handler from a client-side component.
          }
        },
        remove(name: string, options: Record<string, unknown>) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (_error) {
            // The `cookies()` may not be readable yet in a Server Component.
            // This error can be ignored if you are only setting cookies in a Server Action
            // or Route Handler from a client-side component.
          }
        },
      },
    }
  )
}
