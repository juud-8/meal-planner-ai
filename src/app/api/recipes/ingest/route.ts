import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { RecipeIngredient, RecipeInstruction } from '@/types/supabase';

interface SpoonacularIngredient {
  id: number;
  original: string;
  name: string;
  amount: number;
  unit: string;
  aisle?: string;
}

interface SpoonacularInstruction {
  number: number;
  step: string;
}

interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  preparationMinutes?: number;
  cookingMinutes?: number;
  instructions: string;
  analyzedInstructions: SpoonacularInstruction[];
  extendedIngredients: SpoonacularIngredient[];
}

function parseIngredient(ingredient: SpoonacularIngredient): RecipeIngredient {
  return {
    name: ingredient.name,
    quantity: ingredient.amount,
    unit: ingredient.unit,
    is_optional: false
  };
}

function parseInstructions(analyzedInstructions: SpoonacularInstruction[]): RecipeInstruction[] {
  return analyzedInstructions.map(instruction => instruction.step);
}

export async function POST(request: NextRequest) {
  try {
    // Get Supabase client
    const supabase = await createClient();
    
    // Get user from session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Get Spoonacular API key
    const apiKey = process.env.SPOONACULAR_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Spoonacular API key not configured' },
        { status: 500 }
      );
    }

    // Call Spoonacular API
    const spoonacularUrl = `https://api.spoonacular.com/recipes/extract?apiKey=${apiKey}&url=${encodeURIComponent(url)}`;
    const response = await fetch(spoonacularUrl);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Spoonacular API error:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch recipe from URL' },
        { status: response.status }
      );
    }

    const recipeData: SpoonacularRecipe = await response.json();

    // Transform data to match our schema
    const transformedRecipe = {
      user_id: user.id,
      title: recipeData.title,
      description: null, // Spoonacular doesn't provide description
      image_url: recipeData.image,
      servings: recipeData.servings,
      prep_time_minutes: recipeData.preparationMinutes || null,
      cook_time_minutes: recipeData.cookingMinutes || null,
      total_time_minutes: recipeData.readyInMinutes,
      instructions: parseInstructions(recipeData.analyzedInstructions),
      ingredients: recipeData.extendedIngredients.map(parseIngredient),
      source_url: url,
      notes: null,
      is_public: false
    };

    // Insert into database
    const { data: insertedRecipe, error: insertError } = await supabase
      .from('recipes')
      .insert(transformedRecipe)
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to save recipe to database' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Recipe successfully imported',
      recipe: insertedRecipe
    });

  } catch (error) {
    console.error('Recipe ingest error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
