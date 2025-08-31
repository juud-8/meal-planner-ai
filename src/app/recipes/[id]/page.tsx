import { createClient } from '@/lib/supabase/server';
import { Recipe } from '@/types/supabase';
import { notFound } from 'next/navigation';

interface RecipePageProps {
  params: {
    id: string;
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const supabase = await createClient();
  
  // Fetch the recipe by ID
  const { data: recipe, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !recipe) {
    notFound();
  }

  const recipeData = recipe as Recipe;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Recipe Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {recipeData.title}
        </h1>
        
        {recipeData.image_url && (
          <div className="mb-6">
            <img
              src={recipeData.image_url}
              alt={recipeData.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        {recipeData.description && (
          <p className="text-lg text-gray-700 mb-6">
            {recipeData.description}
          </p>
        )}
      </div>

      {/* Recipe Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {recipeData.servings && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-1">Servings</h3>
            <p className="text-gray-700">{recipeData.servings}</p>
          </div>
        )}
        
        {recipeData.prep_time_minutes && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-1">Prep Time</h3>
            <p className="text-gray-700">{recipeData.prep_time_minutes} minutes</p>
          </div>
        )}
        
        {recipeData.cook_time_minutes && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-1">Cook Time</h3>
            <p className="text-gray-700">{recipeData.cook_time_minutes} minutes</p>
          </div>
        )}
        
        {recipeData.total_time_minutes && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-1">Total Time</h3>
            <p className="text-gray-700">{recipeData.total_time_minutes} minutes</p>
          </div>
        )}
      </div>

      {/* Ingredients */}
      {recipeData.ingredients && recipeData.ingredients.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {recipeData.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-gray-600 min-w-[60px]">
                  {ingredient.quantity && ingredient.unit 
                    ? `${ingredient.quantity} ${ingredient.unit}`
                    : ingredient.quantity 
                    ? ingredient.quantity.toString()
                    : ''}
                </span>
                <span className="text-gray-900">
                  {ingredient.name}
                  {ingredient.is_optional && (
                    <span className="text-sm text-gray-500 ml-2">(optional)</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Instructions */}
      {recipeData.instructions && recipeData.instructions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
          <ol className="space-y-4">
            {recipeData.instructions.map((instruction, index) => {
              const stepText = typeof instruction === 'string' 
                ? instruction 
                : instruction.step;
              const timerMinutes = typeof instruction === 'object' 
                ? instruction.timer_minutes 
                : null;

              return (
                <li key={index} className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-900 leading-relaxed">{stepText}</p>
                    {timerMinutes && (
                      <p className="text-sm text-gray-600 mt-1">
                        ⏱️ {timerMinutes} minutes
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {/* Notes */}
      {recipeData.notes && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Notes</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-gray-900">{recipeData.notes}</p>
          </div>
        </div>
      )}

      {/* Source URL */}
      {recipeData.source_url && (
        <div className="text-center">
          <a
            href={recipeData.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            View Original Recipe
          </a>
        </div>
      )}
    </div>
  );
}
