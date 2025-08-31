'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createClient } from '@/lib/supabase/client'

export default function AuthForm() {
  // Magic Link state
  const [magicLinkEmail, setMagicLinkEmail] = useState('')
  
  // Email/Password state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // General state
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const handleMagicLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOtp({
        email: magicLinkEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setMessage(`Error: ${error.message}`)
      } else {
        setMessage('Check your email for the magic link!')
        setMagicLinkEmail('')
      }
    } catch (_error) {
      setMessage('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setMessage(`Error: ${error.message}`)
      } else {
        setMessage('Successfully signed in!')
        setEmail('')
        setPassword('')
      }
    } catch (_error) {
      setMessage('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setMessage(`Error: ${error.message}`)
      } else {
        setMessage('Check your email to confirm your account!')
        setEmail('')
        setPassword('')
      }
    } catch (_error) {
      setMessage('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    setMessage('')

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setMessage(`Error: ${error.message}`)
      }
    } catch (_error) {
      setMessage('An unexpected error occurred. Please try again.')
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Sign in to your account
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Choose your preferred sign-in method
        </p>
      </div>

      <Tabs defaultValue="magic-link" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="magic-link">Magic Link</TabsTrigger>
          <TabsTrigger value="email-password">Email & Password</TabsTrigger>
        </TabsList>

        <TabsContent value="magic-link" className="space-y-4">
          <form onSubmit={handleMagicLinkSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Enter your email"
                value={magicLinkEmail}
                onChange={(e) => setMagicLinkEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !magicLinkEmail}
              className="w-full"
            >
              {isLoading ? 'Sending...' : 'Send Magic Link'}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="email-password" className="space-y-4">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isLoading || !email || !password}
                className="flex-1"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleSignUp}
                disabled={isLoading || !email || !password}
                className="flex-1"
              >
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading}
        className="w-full"
      >
        {isGoogleLoading ? 'Signing in...' : 'Sign in with Google'}
      </Button>

      {message && (
        <div
          className={`p-3 rounded-md text-sm ${
            message.includes('Error')
              ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
              : 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  )
}
