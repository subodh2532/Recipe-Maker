import Link from 'next/link';
import { PlayCircle } from 'lucide-react';

import { RatingStars } from '@/components/RatingStars';
import { Card, CardContent } from '@/components/ui/card';
import { Review } from '@/lib/types';

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) {
    return (
      <Card className="border-dashed bg-secondary/70">
        <CardContent>
          <p className="text-sm text-muted-foreground">No reviews yet. Be the first to share your thoughts.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id} className="border-white/70">
          <CardContent className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <RatingStars rating={review.rating} />
              <span className="text-sm text-muted-foreground">{new Date(review.created_at).toLocaleDateString()}</span>
            </div>
            <p className="text-sm leading-6 text-slate-700">{review.comment}</p>
            {review.video_url ? (
              <Link
                href={review.video_url}
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <PlayCircle className="h-4 w-4" />
                Watch video review
              </Link>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
