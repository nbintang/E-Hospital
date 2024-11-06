export function formatCategoriesToSlugs(categories: string[]): string[] {
    return categories.map((category) => category.toLowerCase().replace(/\s+/g, '-'));
  }