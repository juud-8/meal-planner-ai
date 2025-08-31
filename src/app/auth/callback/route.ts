import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    try {
      const supabase = await createClient()
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Error exchanging code for session:', error)
        return NextResponse.redirect(new URL('/login', request.url))
      }

      // Successful authentication, redirect to home page
      return NextResponse.redirect(new URL('/', request.url))
    } catch (error) {
      console.error('Unexpected error during auth callback:', error)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // No code provided, redirect to login
  return NextResponse.redirect(new URL('/login', request.url))
}
