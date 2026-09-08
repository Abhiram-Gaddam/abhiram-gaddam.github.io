# Portfolio — Setup

```
npm install
npm run dev
```

Routes:
- `/` — Zone A, professional (default)
- `/about` — Zone B, personal (linked from footer/nav only)
- `/admin` — content editor, password-protected, saves to a Supabase database.
- `/admin/login` — password sign-in for the editor.

## Database

Content is stored in Supabase, not localStorage. **See `DATABASE_SETUP.md`
for the full one-time setup** (SQL to run, env vars to set, how the auth
works). Short version: `/admin` is guarded by a signed session cookie, only
issued after the correct `ADMIN_PASSWORD`; the actual database write uses a
service-role key that only ever lives on the server.

## Full architecture reference

See `PORTFOLIO_NOTES.md` for a complete walkthrough of the design system,
content model, component architecture, and the reasoning behind the major
decisions — written to be dropped into a fresh chat if you need help on this
project again later.