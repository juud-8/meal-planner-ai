import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent">
          Hello, Meal Planner!
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Welcome to your AI-powered meal planning assistant. Plan delicious meals, discover new recipes, and organize your kitchen like never before.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {session ? (
            <>
              <Link href="/profile">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  View Profile
                </Button>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Welcome back, {session.user.email}!
              </p>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Get Started
                </Button>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sign in to start planning your meals
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
