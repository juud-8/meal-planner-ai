-- Create recipes table
CREATE TABLE public.recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    servings INTEGER,
    prep_time_minutes INTEGER,
    cook_time_minutes INTEGER,
    total_time_minutes INTEGER,
    instructions JSONB NOT NULL,
    ingredients JSONB NOT NULL,
    source_url TEXT,
    notes TEXT,
    is_public BOOLEAN DEFAULT FALSE
);

-- Create index on user_id for better performance
CREATE INDEX idx_recipes_user_id ON public.recipes(user_id);

-- Create index on is_public for public recipe queries
CREATE INDEX idx_recipes_is_public ON public.recipes(is_public);

-- Enable Row Level Security
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Recipes are viewable by their owner and public recipes are viewable by everyone
CREATE POLICY "Recipes are viewable by their owner and public recipes are viewable by everyone." ON public.recipes
    FOR SELECT USING (auth.uid() = user_id OR is_public = true);

-- Users can create their own recipes
CREATE POLICY "Users can create their own recipes." ON public.recipes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own recipes
CREATE POLICY "Users can update their own recipes." ON public.recipes
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own recipes
CREATE POLICY "Users can delete their own recipes." ON public.recipes
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at on recipe updates
CREATE TRIGGER update_recipes_updated_at
    BEFORE UPDATE ON public.recipes
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
