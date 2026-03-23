import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { RatingStars } from '@/components/RatingStars';
import { Card, CardContent } from '@/components/ui/card';
import { Recipe } from '@/lib/types';

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipe/${recipe.id}`} className="group block h-full">
      <Card className="h-full overflow-hidden border-white/70 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={recipe.image_url}
            alt={recipe.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="flex h-[calc(100%-14rem)] flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">{recipe.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{recipe.description}</p>
            </div>
          </div>
          <div className="mt-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <RatingStars rating={recipe.averageRating ?? 0} />
              <span className="text-sm font-medium text-muted-foreground">{(recipe.averageRating ?? 0).toFixed(1)}</span>
            </div>
            <span className="inline-flex items-center text-sm font-medium text-primary">
              View
              <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
