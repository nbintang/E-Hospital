import db from "@/lib/db";

export async function findArticles() {
  const article = await db.article.findMany();
  return article;
}

export async function createArticles({
  title,
  content,
  slug,
  imageUrl,
  isPublished = false,
  doctorId,
  categorySlugs,
}: {
  title: string;
  content: string;
  slug: string;
  imageUrl: string;
  isPublished?: boolean;
  doctorId: string;
  categorySlugs: string[];
}) {
  const article = await db.article.create({
    data: {
      title,
      content,
      slug,
      imageUrl,
      isPublished,
      doctorId,
      categories: {
        connect: categorySlugs.map((slug) => ({ slug })),
      },
    },
  });
  return article;
}
