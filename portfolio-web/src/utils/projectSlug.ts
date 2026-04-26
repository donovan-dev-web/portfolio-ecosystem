export function slugifyProjectTitle(title: string) {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export function buildProjectSlug(title: string, fallbackSlug: string) {
  const slug = slugifyProjectTitle(title);
  return slug || fallbackSlug;
}
