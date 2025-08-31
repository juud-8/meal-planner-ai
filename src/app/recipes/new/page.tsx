"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewRecipePage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleFetchRecipe = async () => {
    if (!url.trim()) {
      setMessage({ type: "error", text: "Please enter a recipe URL" });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/recipes/ingest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch recipe');
      }

      setMessage({ type: "success", text: "Recipe successfully imported! Redirecting..." });
      
      // Navigate to profile page after a short delay
      setTimeout(() => {
        router.push('/profile');
      }, 1500);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setMessage({ 
        type: "error", 
        text: error instanceof Error ? error.message : "Failed to fetch recipe. Please try again." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="w-full max-w-md mx-auto p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent">
            Add New Recipe from URL
          </h1>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="recipe-url" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Recipe URL
            </label>
            <Input
              id="recipe-url"
              type="url"
              placeholder="https://example.com/recipe"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
              className="w-full"
            />
          </div>

          <Button
            onClick={handleFetchRecipe}
            disabled={isLoading || !url.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {isLoading ? "Fetching..." : "Fetch Recipe"}
          </Button>

          {message && (
            <div className={`p-3 rounded-md text-sm ${
              message.type === "success" 
                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" 
                : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
            }`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
