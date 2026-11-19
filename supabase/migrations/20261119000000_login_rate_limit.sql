create table public.portfolio_login_attempts (
  scope text primary key check (scope in ('admin', 'drive')),
  window_started_at timestamptz not null,
  attempts integer not null
);

alter table public.portfolio_login_attempts enable row level security;
revoke all on public.portfolio_login_attempts from public, anon, authenticated;

create function public.consume_portfolio_login_attempt(login_scope text)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_timepoint timestamptz := clock_timestamp();
  window_duration interval := interval '5 minutes';
  attempt_limit integer := 30;
  window_end timestamptz;
  attempt_count integer;
begin
  insert into public.portfolio_login_attempts as counter (scope, window_started_at, attempts)
    values (login_scope, current_timepoint, 1)
  on conflict (scope) do update
    set window_started_at = case
          when counter.window_started_at + window_duration <= excluded.window_started_at
          then excluded.window_started_at
          else counter.window_started_at
        end,
        attempts = case
          when counter.window_started_at + window_duration <= excluded.window_started_at then 1
          else least(counter.attempts + 1, attempt_limit + 1)
        end
  returning counter.window_started_at + window_duration, counter.attempts
    into window_end, attempt_count;

  if attempt_count <= attempt_limit then
    return 0;
  end if;
  return greatest(1, ceil(extract(epoch from window_end - clock_timestamp()))::integer);
end;
$$;

revoke all on function public.consume_portfolio_login_attempt(text) from public, anon, authenticated;
grant execute on function public.consume_portfolio_login_attempt(text) to service_role;
