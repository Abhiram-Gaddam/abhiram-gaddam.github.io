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

The app reads row `id = 1` from `public.portfolio_content` and saves the
document in the `data` JSONB column with an `updated_at` timestamp.
Enable row-level security and allow the anonymous role to select the
content row. The server uses the Supabase service-role key for writes.

Apply [the login rate-limit migration](supabase/migrations/20261119000000_login_rate_limit.sql)
to Supabase before deploying this version. Each login endpoint shares a
separate budget of 30 attempts per five minutes across all visitors and
server instances. Sign-in returns a temporary-unavailable error if the
limiter cannot reach the database.

## Deployment

Deploy to a host that runs Next.js server routes. On a Node.js 22 host,
run `npm ci`, `npm run build`, and `npm run start`. GitHub Actions checks
the server build on pushes and pull requests.

Configure these variables on the host or in `.env.local` for development.

| Feature | Variables |
| --- | --- |
| Supabase | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| Admin | `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` |
| Drive documents | `DRIVE_PASSWORD`, `DRIVE_AUTH_SECRET`, `GOOGLE_DRIVE_FOLDER_ID`, `GOOGLE_SERVICE_ACCOUNT_KEY` |

Set `GOOGLE_SERVICE_ACCOUNT_KEY` to the base64-encoded service-account JSON
and share the configured Drive folder with that account.
