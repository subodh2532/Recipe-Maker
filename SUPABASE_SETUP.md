# Supabase Setup (Free Tier)

Use this checklist after creating your Supabase project.

## 1) Run SQL migration
1. Open Supabase dashboard -> SQL Editor.
2. Paste entire `migration.sql`.
3. Run the script.

This creates:
- `public.recipes`
- `public.reviews`
- `public.recipe_cards` view
- RLS policies for public read + insert (MVP mode)

## 2) Configure environment variables
Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

Reference template: `.env.example`.

## 3) Verify project settings
- Ensure RLS is enabled for both tables (migration does this).
- Ensure `anon` key is used only in frontend/public context.

## 4) Optional production hardening
For public launch, replace public insert policies with authenticated policies and add ownership columns.
