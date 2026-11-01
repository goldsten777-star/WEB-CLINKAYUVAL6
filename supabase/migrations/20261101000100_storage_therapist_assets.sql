-- Public bucket for logos and about images.
-- Files live under "<user id>/..." and only that user can write there.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'therapist-assets',
  'therapist-assets',
  true,
  2097152, -- 2 MB
  array['image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do nothing;

create policy "Owners upload to their folder"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'therapist-assets'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

create policy "Owners update their files"
on storage.objects for update
to authenticated
using (
  bucket_id = 'therapist-assets'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

create policy "Owners delete their files"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'therapist-assets'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);
