'use client'

import { useEffect, useState } from 'react'
import AuthForm from '@/components/AuthForm'

export default function LoginPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating circles */}
        <div className={`absolute top-20 left-20 w-32 h-32 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-xl transition-all duration-1000 ${isLoaded ? 'animate-bounce' : 'opacity-0'}`} style={{ animationDuration: '3s' }}></div>
        <div className={`absolute top-40 right-32 w-24 h-24 bg-indigo-200/30 dark:bg-indigo-800/20 rounded-full blur-xl transition-all duration-1000 delay-300 ${isLoaded ? 'animate-bounce' : 'opacity-0'}`} style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
        <div className={`absolute bottom-32 left-32 w-20 h-20 bg-purple-200/30 dark:bg-purple-800/20 rounded-full blur-xl transition-all duration-1000 delay-500 ${isLoaded ? 'animate-bounce' : 'opacity-0'}`} style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]"></div>
      </div>

      {/* Main content container */}
      <div className={`relative z-10 w-full max-w-md transition-all duration-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {/* Card container with glassmorphism effect */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur opacity-20 dark:opacity-30 animate-pulse"></div>
          
          {/* Main card */}
          <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
            {/* Header section */}
            <div className={`text-center mb-8 transition-all duration-700 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg transition-all duration-1000 delay-500 ${isLoaded ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                  />
                </svg>
              </div>
              
              {/* Title */}
              <h1 className={`text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-2 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                Login or Sign Up
              </h1>
              
              {/* Subtitle */}
              <p className={`text-gray-600 dark:text-gray-400 text-lg transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                Welcome back! Enter your details to continue
              </p>
            </div>

            {/* Auth form */}
            <div className={`transition-all duration-700 delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <AuthForm />
            </div>

            {/* Footer */}
            <div className={`text-center mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50 transition-all duration-700 delay-600 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                By continuing, you agree to our{' '}
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline transition-colors">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional floating elements */}
      <div className={`absolute bottom-8 left-8 text-xs text-gray-400 dark:text-gray-500 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Secure authentication</span>
        </div>
      </div>
    </div>
  )
}
