import db from "@/lib/db";
import { Article } from "@prisma/client";

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
  categoryId,
}: Article) {
  const article = await db.article.create({
    data: {
      title,
      content,
      slug,
      imageUrl,
      isPublished,
      doctorId,
      categoryId
    },
  });
  console.log(article);
}
