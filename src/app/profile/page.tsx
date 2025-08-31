import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProfileClient from './ProfileClient'

export default async function ProfilePage() {
  const supabase = await createClient()
  
  // Get the current user's session
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()
  
  if (sessionError) {
    console.error('Session error:', sessionError)
    redirect('/login')
  }
  
  if (!session) {
    redirect('/login')
  }
  
  // Fetch the user's profile data
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('username, full_name, avatar_url, website, updated_at')
    .eq('id', session.user.id)
    .single()
  
  if (profileError) {
    console.error('Profile fetch error:', profileError)
    // Continue without profile data if there's an error
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ProfileClient 
          user={session.user}
          profile={profile}
        />
      </div>
    </div>
  )
}
