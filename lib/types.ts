export type Review = {
  id: string;
  recipe_id: string;
  user_id: string;
  rating: number;
  comment: string;
  video_url?: string | null;
  created_at: string;
};

export type Recipe = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  image_url: string;
  ingredients: string[];
  steps: string[];
  created_at: string;
  reviews?: Review[];
  averageRating?: number;
  reviewCount?: number;
};

export type RecipeInsert = {
  user_id: string;
  title: string;
  description: string;
  image_url: string;
  ingredients: string[];
  steps: string[];
};

export type ReviewInsert = {
  recipe_id: string;
  user_id: string;
  rating: number;
  comment: string;
  video_url?: string | null;
};
