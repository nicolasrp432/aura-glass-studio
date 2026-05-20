-- Send contact form emails automatically when a message is inserted.

create extension if not exists pg_net;

-- Use the verified domain sender in Resend.


create or replace function public.notify_contact_message()
returns trigger
language plpgsql
security definer
as $$
begin
  perform net.http_post(
    url := 'https://rentavxwwgfvfupnfrdl.supabase.co/functions/v1/send-contact-email',
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := jsonb_build_object(
      'type', 'INSERT',
      'record', jsonb_build_object(
        'name', new.name,
        'email', new.email,
        'subject', coalesce(new.subject, 'Reserva'),
        'message', new.message
      )
    )
  );

  return new;
end;
$$;

drop trigger if exists trg_notify_contact_message on public.messages;

create trigger trg_notify_contact_message
after insert on public.messages
for each row
execute function public.notify_contact_message();
