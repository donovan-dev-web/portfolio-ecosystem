function slugifyProjectTitle(title) {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function buildProjectSlug(title, fallbackSlug) {
  const slug = slugifyProjectTitle(title);
  return slug || fallbackSlug;
}

module.exports = {
  slugifyProjectTitle,
  buildProjectSlug,
};
