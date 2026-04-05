# Supabase + Clerk Setup (Free Tier)

Use this checklist after creating your Supabase and Clerk projects.
# Supabase Setup (Free Tier)

Use this checklist after creating your Supabase project.

## 1) Run SQL migration
1. Open Supabase dashboard -> SQL Editor.
2. Paste entire `migration.sql`.
3. Run the script.

This creates:
- `public.recipes` (with `user_id`)
- `public.reviews` (with `user_id`)
- `public.recipe_cards` view
- RLS policies and indexes
- `public.recipes`
- `public.reviews`
- `public.recipe_cards` view
- RLS policies for public read + insert (MVP mode)

## 2) Configure environment variables
Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
```

Reference template: `.env.example`.

## 3) Vercel deployment envs (important)
In Vercel -> Project Settings -> Environment Variables, add all 5 keys above for Production (and Preview if needed), then redeploy.

## 4) Verify in production
Open:

```text
https://<your-domain>/api/health/supabase
```

Expected:
- all Supabase `env` values are `true`
- `checks.publicReadRecipes` = `ok`
- `checks.serverReadRecipes` = `ok`

## 5) Clerk auth behavior
- UI uses Clerk `Show` blocks in `app/layout.tsx`.
- Signed-out users see Sign In / Sign Up.
- Signed-in users see profile button.
- API routes accept signed-out submissions too (stored as `user_id = 'anonymous'`).

## 6) Important migration note
If your project was created before the latest migration update and does not yet have `user_id` columns,
apply `migration.sql` again. The API has a legacy fallback, but running migration is still required as the final fix.

## 7) Optional production hardening
For public launch, require signed-in users for writes and enforce ownership rules in both API and RLS.
## 6) Optional production hardening
For public launch, require signed-in users for writes and enforce ownership rules in both API and RLS.
- API routes require signed-in users (`auth()` on server).

## 6) Optional production hardening
Replace MVP insert policies with stricter ownership checks and add moderation/rate-limits.
## 3) Verify project settings
- Ensure RLS is enabled for both tables (migration does this).
- Ensure `anon` key is used only in frontend/public context.

## 4) Optional production hardening
For public launch, replace public insert policies with authenticated policies and add ownership columns.
