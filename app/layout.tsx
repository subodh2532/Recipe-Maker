import type { Metadata } from 'next';
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import './globals.css';

import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Recipe Maker',
  description: 'A modern recipe-sharing MVP built with Next.js, Tailwind, shadcn-style UI, Supabase, and Clerk.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <div className="border-b border-white/70 bg-background/80">
            <div className="container-shell flex h-12 items-center justify-end gap-2">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <Button size="sm" variant="outline">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">Sign Up</Button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </div>
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
