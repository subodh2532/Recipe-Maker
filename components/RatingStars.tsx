'use client';

import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';

type RatingStarsProps = {
  rating: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
};

export function RatingStars({ rating, interactive = false, onChange, className }: RatingStarsProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: 5 }).map((_, index) => {
        const value = index + 1;
        const filled = value <= Math.round(rating);
        return (
          <button
            key={value}
            type="button"
            className={cn('transition', interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default')}
            onClick={() => interactive && onChange?.(value)}
            aria-label={`Rate ${value} star${value > 1 ? 's' : ''}`}
          >
            <Star className={cn('h-5 w-5', filled ? 'fill-primary text-primary' : 'text-slate-300')} />
          </button>
        );
      })}
    </div>
  );
}
