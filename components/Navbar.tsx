import Link from 'next/link';
import { ChefHat, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-background/80 backdrop-blur-xl">
      <div className="container-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
            <ChefHat className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Recipe Maker</p>
            <p className="text-xs text-muted-foreground">Cook, rate, and share your favorites</p>
          </div>
        </Link>

        <Button asChild size="sm">
          <Link href="/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Recipe
          </Link>
        </Button>
      </div>
    </header>
  );
}
