'use client';

import { useState } from 'react';
import { Loader2, Send } from 'lucide-react';

import { RatingStars } from '@/components/RatingStars';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type ReviewClientPayload = {
  recipe_id: string;
  rating: number;
  comment: string;
  video_url?: string | null;
};

export function ReviewForm({ recipeId }: { recipeId: string }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const payload: ReviewClientPayload = {
        recipe_id: recipeId,
        rating,
        comment: comment.trim(),
        video_url: videoUrl.trim() || null,
      };

      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Unable to submit review');
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipe_id: recipeId, rating, comment, video_url: videoUrl || null }),
      });

      if (!response.ok) {
        throw new Error('Unable to submit review');
      }

      setComment('');
      setVideoUrl('');
      setRating(5);
      setFeedback('Review submitted successfully. Refresh to see the latest review.');
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Review submission failed.');
    } catch {
      setFeedback('Review submission is available once your backend is connected.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/70 bg-white p-6 shadow-soft">
      <div className="space-y-2">
        <Label>Your rating</Label>
        <RatingStars rating={rating} interactive onChange={setRating} className="pt-1" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Comment</Label>
        <Textarea
          id="comment"
          required
          placeholder="What did you love? What would you tweak next time?"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="video-url">Video URL (optional)</Label>
        <Input
          id="video-url"
          type="url"
          placeholder="https://youtube.com/watch?v=..."
          value={videoUrl}
          onChange={(event) => setVideoUrl(event.target.value)}
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
        Submit Review
      </Button>

      {feedback ? <p className="text-sm text-muted-foreground">{feedback}</p> : null}
    </form>
  );
}
