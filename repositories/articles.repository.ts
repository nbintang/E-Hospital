import db from "@/lib/db";
import { createCategoryIfNotExists } from "./categories.repository";
import { formatSlugToTitle } from "@/helper";

export async function findArticles() {
  const article = await db.article.findMany({
    include: {
      categories: true,
    },
  });
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
        connectOrCreate: categorySlugs.map((slug) => ({
          where: { slug }, // Check if a category with this slug exists
          create: {
            name: formatSlugToTitle(slug), // Convert slug to title
            slug, // Use the same slug
          },
        })),
      },
    },
  });
  return article;
}