'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { User } from '@supabase/supabase-js'

interface Profile {
  username?: string | null
  full_name?: string | null
  avatar_url?: string | null
  website?: string | null
  updated_at?: string | null
}

interface ProfileClientProps {
  user: User
  profile: Profile | null
}

export default function ProfileClient({ user, profile }: ProfileClientProps) {
  const router = useRouter()
  
  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg 
            className="w-10 h-10 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account settings
        </p>
      </div>
      
      {/* Profile Information */}
      <div className="space-y-6 mb-8">
        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <p className="text-gray-900 dark:text-white">{user.email}</p>
          </div>
        </div>
        
        {/* Username */}
        {profile?.username && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <p className="text-gray-900 dark:text-white">{profile.username}</p>
            </div>
          </div>
        )}
        
        {/* Full Name */}
        {profile?.full_name && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <p className="text-gray-900 dark:text-white">{profile.full_name}</p>
            </div>
          </div>
        )}
        
        {/* Website */}
        {profile?.website && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Website
            </label>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <a 
                href={profile.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {profile.website}
              </a>
            </div>
          </div>
        )}
        
        {/* Last Updated */}
        {profile?.updated_at && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Last Updated
            </label>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <p className="text-gray-900 dark:text-white">
                {new Date(profile.updated_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Sign Out Button */}
      <div className="text-center">
        <Button 
          onClick={handleSignOut}
          variant="destructive"
          className="w-full"
        >
          Sign Out
        </Button>
      </div>
      
      {/* Additional Info */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          User ID: {user.id.slice(0, 8)}...
        </p>
      </div>
    </div>
  )
}
