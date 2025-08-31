// TypeScript interfaces and types for Supabase database schema

export interface RecipeIngredient {
  name: string;
  quantity: number | null;
  unit: string | null;
  is_optional: boolean;
}

export type RecipeInstruction = string | {
  step: string;
  timer_minutes?: number;
};

export interface Recipe {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string | null;
  image_url: string | null;
  servings: number | null;
  prep_time_minutes: number | null;
  cook_time_minutes: number | null;
  total_time_minutes: number | null;
  instructions: RecipeInstruction[];
  ingredients: RecipeIngredient[];
  source_url: string | null;
  notes: string | null;
  is_public: boolean;
}

// Database table names for type safety
export type DatabaseTable = 'recipes' | 'profiles';

// Helper type for creating new recipes (without auto-generated fields)
export type CreateRecipeInput = Omit<Recipe, 'id' | 'created_at' | 'updated_at'>;

// Helper type for updating recipes (making most fields optional)
export type UpdateRecipeInput = Partial<Omit<Recipe, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;

// Type for recipe queries with optional filters
export interface RecipeFilters {
  user_id?: string;
  is_public?: boolean;
  title?: string;
  limit?: number;
  offset?: number;
}

// Type for recipe search results
export interface RecipeSearchResult {
  recipes: Recipe[];
  total: number;
  hasMore: boolean;
}
