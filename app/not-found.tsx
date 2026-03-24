import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="container-shell flex min-h-[70vh] flex-col items-center justify-center gap-5 py-16 text-center">
      <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-muted-foreground">404</span>
      <h1 className="text-3xl font-semibold tracking-tight">Recipe not found</h1>
      <p className="max-w-md text-muted-foreground">We couldn’t find the recipe you were looking for. Browse the latest recipes or add a new one.</p>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  );
}
