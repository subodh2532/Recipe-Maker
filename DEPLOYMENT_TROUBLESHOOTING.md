# Deployment Troubleshooting (Vercel)

## Error: `package.json: Expected ',' or '}' after property value`

If Vercel shows this error, `package.json` in the deployed commit is malformed.

### Most common cause

The file was pasted as an escaped string (contains literal `\\n` text), for example:

```json
{\n  "name": "recipe-maker", ... }
```

Instead, `package.json` must be normal multiline JSON.

### Fix in GitHub Web (no local machine needed)

1. Open the exact branch Vercel is deploying (usually `main`).
2. Open `package.json` and click **Edit**.
3. Remove escaped `\\n` characters and ensure valid JSON structure.
4. Save/commit the file.
5. Redeploy in Vercel.

### Verification

This repository includes a syntax checker:

```bash
node scripts/validate-package-json.mjs
```

If `package.json` is malformed, it exits with a clear error.
