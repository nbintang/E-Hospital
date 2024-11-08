import db from "@/lib/db";
import { createCategoryIfNotExists } from "./categories.repository";
import { formatSlugToTitle } from "@/helper";
import { ArticleStatus } from "@prisma/client";

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
  doctorId,
  status = "DRAFT",
  categorySlugs,
}: {
  title: string;
  content: string;
  slug: string;
  imageUrl: string;
  status?: ArticleStatus;
  doctorId: string;
  categorySlugs: string[];
}) {
  const article = await db.article.create({
    data: {
      title,
      content,
      slug,
      imageUrl,
      status,
      doctorId,
      categories: {
        connectOrCreate: categorySlugs.map((slug) => ({
          where: { slug },
          create: {
            name: formatSlugToTitle(slug),
            slug,
          },
        })),
      },
    },
  });
  return article;
}

export async function findArticlesBySlug({ slug }: { slug: string }) {
  return await db.article.findUnique({
    where: { slug },
  });
}
