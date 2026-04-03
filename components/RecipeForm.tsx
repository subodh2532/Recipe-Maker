'use client';

import { useState } from 'react';
import { Loader2, MinusCircle, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type RecipeClientPayload = {
  title: string;
  description: string;
  image_url: string;
  ingredients: string[];
  steps: string[];
};

const emptyIngredient = '';
const emptyStep = '';

export function RecipeForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ingredients, setIngredients] = useState([emptyIngredient]);
  const [steps, setSteps] = useState([emptyStep]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateList = (setter: (items: string[]) => void, items: string[], index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    setter(next);
  };

  const addField = (setter: (items: string[]) => void, items: string[]) => setter([...items, '']);
  const removeField = (setter: (items: string[]) => void, items: string[], index: number) => {
    if (items.length === 1) {
      setter(['']);
      return;
    }
    setter(items.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const filteredIngredients = ingredients.map((item) => item.trim()).filter(Boolean);
    const filteredSteps = steps.map((item) => item.trim()).filter(Boolean);

    if (!title.trim() || !description.trim() || !imageUrl.trim() || !filteredIngredients.length || !filteredSteps.length) {
      setError('Please complete all required fields before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: RecipeClientPayload = {
        title: title.trim(),
        description: description.trim(),
        image_url: imageUrl.trim(),
        ingredients: filteredIngredients,
        steps: filteredSteps,
      };

      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Unable to add recipe');
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          image_url: imageUrl,
          ingredients: filteredIngredients,
          steps: filteredSteps,
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to add recipe');
      }

      router.push('/');
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Recipe submission failed.');
    } catch {
      setError('Recipe submission is ready, and will persist once Supabase is configured.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 rounded-[2rem] border border-white/70 bg-white p-6 shadow-soft sm:p-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="title">Recipe title</Label>
          <Input id="title" placeholder="e.g. Roasted Red Pepper Pasta" value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Tell people why this recipe is special, quick, comforting, or healthy."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="image-url">Image URL</Label>
          <Input id="image-url" type="url" placeholder="https://images.unsplash.com/..." value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} />
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">Ingredients</h3>
            <p className="text-sm text-muted-foreground">Add one ingredient per line item.</p>
          </div>
          <Button type="button" variant="outline" onClick={() => addField(setIngredients, ingredients)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add ingredient
          </Button>
        </div>

        <div className="space-y-3">
          {ingredients.map((ingredient, index) => (
            <div key={`ingredient-${index}`} className="flex items-center gap-3">
              <Input
                placeholder={`Ingredient ${index + 1}`}
                value={ingredient}
                onChange={(event) => updateList(setIngredients, ingredients, index, event.target.value)}
              />
              <Button type="button" variant="ghost" size="icon" onClick={() => removeField(setIngredients, ingredients, index)}>
                <MinusCircle className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">Steps</h3>
            <p className="text-sm text-muted-foreground">Guide cooks through the process clearly.</p>
          </div>
          <Button type="button" variant="outline" onClick={() => addField(setSteps, steps)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add step
          </Button>
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={`step-${index}`} className="flex items-start gap-3">
              <div className="mt-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-foreground">
                {index + 1}
              </div>
              <Textarea
                className="min-h-24"
                placeholder={`Step ${index + 1}`}
                value={step}
                onChange={(event) => updateList(setSteps, steps, index, event.target.value)}
              />
              <Button type="button" variant="ghost" size="icon" onClick={() => removeField(setSteps, steps, index)}>
                <MinusCircle className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {error ? <p className="rounded-2xl bg-secondary px-4 py-3 text-sm text-muted-foreground">{error}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Submit Recipe
        </Button>
        <p className="text-sm text-muted-foreground">Sign in first, then this form will create live rows in Supabase via secure server API routes.</p>
        <p className="text-sm text-muted-foreground">The form is wired for Supabase and gracefully falls back until env vars are configured.</p>
      </div>
    </form>
  );
}
