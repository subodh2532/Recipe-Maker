import { Recipe, Review } from '@/lib/types';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    user_id: 'mock-user-1',
    title: 'Creamy Tuscan Pasta',
    description: 'A rich and cozy pasta loaded with garlic, spinach, and sun-dried tomatoes.',
    image_url: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=1200&q=80',
    ingredients: ['250g fettuccine', '2 cloves garlic', '1 cup cream', '1 cup spinach', '1/3 cup parmesan'],
    steps: ['Boil the pasta until al dente.', 'Sauté garlic in olive oil.', 'Add cream, spinach, and parmesan.', 'Toss pasta into the sauce and serve warm.'],
    created_at: '2026-03-20T12:00:00.000Z',
  },
  {
    id: '2',
    user_id: 'mock-user-2',
    title: 'Mango Chia Breakfast Bowl',
    description: 'A fresh, naturally sweet breakfast bowl with tropical mango and crunchy toppings.',
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    ingredients: ['3 tbsp chia seeds', '1 cup almond milk', '1 mango', 'Granola', 'Mint leaves'],
    steps: ['Mix chia seeds with almond milk and chill overnight.', 'Blend half the mango into a puree.', 'Layer pudding, puree, and toppings in a bowl.'],
    created_at: '2026-03-18T08:30:00.000Z',
  },
  {
    id: '3',
    user_id: 'mock-user-3',
    title: 'Smoky Paneer Tacos',
    description: 'Spiced paneer tacos with crunchy slaw and creamy yogurt drizzle.',
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
    ingredients: ['200g paneer', '6 taco shells', '1 tsp paprika', 'Red cabbage slaw', 'Mint yogurt'],
    steps: ['Season and sear paneer.', 'Warm taco shells.', 'Fill with slaw, paneer, and yogurt sauce.'],
    created_at: '2026-03-15T17:45:00.000Z',
  },
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    recipe_id: '1',
    user_id: 'mock-user-2',
    rating: 5,
    comment: 'Super comforting and easy to make after work.',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    created_at: '2026-03-21T14:00:00.000Z',
  },
  {
    id: 'r2',
    recipe_id: '1',
    user_id: 'mock-user-1',
    rating: 4,
    comment: 'Loved the sauce, added mushrooms for extra texture.',
    created_at: '2026-03-22T11:30:00.000Z',
  },
  {
    id: 'r3',
    recipe_id: '2',
    user_id: 'mock-user-3',
    rating: 5,
    comment: 'Bright, healthy, and perfect for warm mornings.',
    created_at: '2026-03-19T09:15:00.000Z',
  },
];
