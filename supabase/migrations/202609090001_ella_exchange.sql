-- Apply to the dedicated Ella project. No existing memory tables are accessed.
begin;
create table public.ella_exchange_notes (
 id uuid primary key,
 name text not null check (length(name) between 1 and 80),
 participant text not null check (participant in ('human','agent')),
 body text not null check (length(body) between 20 and 2000),
 reference text not null default '' check (reference = '' or (reference like 'https://%' and length(reference) <= 500)),
 status text not null default 'pending' check (status in ('pending','approved','rejected')),
 response text not null default '' check (length(response) <= 2000),
 created_at timestamptz not null default now(),
 approved_at timestamptz,
 check (status <> 'approved' or approved_at is not null)
);
create index ella_exchange_status_date on public.ella_exchange_notes(status, approved_at desc);
alter table public.ella_exchange_notes enable row level security;
revoke all on public.ella_exchange_notes from anon, authenticated;
grant select, insert, update on public.ella_exchange_notes to service_role;
-- One shared daily budget covers every submission surface, including MCP.
create table public.ella_exchange_budget (day date primary key, count integer not null);
alter table public.ella_exchange_budget enable row level security;
revoke all on public.ella_exchange_budget from anon, authenticated;
grant select, insert, update, delete on public.ella_exchange_budget to service_role;
create function public.ella_exchange_submit(payload jsonb) returns text
language plpgsql security invoker set search_path = '' as $$
declare existing public.ella_exchange_notes; total integer;
begin
 -- Serializes budget and idempotency checks, including concurrent duplicate requests.
 perform pg_advisory_xact_lock(746329012);
 if payload->>'consent' is distinct from 'true' then raise exception 'Consent required'; end if;
 select * into existing from public.ella_exchange_notes where id = (payload->>'submissionId')::uuid;
 if found then
   if existing.name = payload->>'name' and existing.participant = payload->>'participant'
     and existing.body = payload->>'body' and existing.reference = coalesce(payload->>'reference','') then return 'received'; end if;
   return 'conflict';
 end if;
 select count into total from public.ella_exchange_budget where day = (now() at time zone 'UTC')::date;
 if coalesce(total,0) >= 100 then return 'full'; end if;
 -- Bound the total unattended queue as well as daily growth.
 select count(*) into total from public.ella_exchange_notes where status = 'pending';
 if total >= 500 then return 'full'; end if;
 insert into public.ella_exchange_notes(id,name,participant,body,reference)
 values ((payload->>'submissionId')::uuid,payload->>'name',payload->>'participant',payload->>'body',coalesce(payload->>'reference',''));
 insert into public.ella_exchange_budget(day,count) values ((now() at time zone 'UTC')::date,1)
 on conflict(day) do update set count = public.ella_exchange_budget.count + 1;
 delete from public.ella_exchange_budget where day < (now() at time zone 'UTC')::date - 2;
 return 'received';
end $$;
revoke all on function public.ella_exchange_submit(jsonb) from public, anon, authenticated;
grant execute on function public.ella_exchange_submit(jsonb) to service_role;
commit;
