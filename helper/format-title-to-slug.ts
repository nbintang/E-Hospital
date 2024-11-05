export const formatTitleToSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export function formatCategoriesToSlugs(categories: string[]): string[] {
  return categories.map((category) => category.toLowerCase().replace(/\s+/g, '-'));
}