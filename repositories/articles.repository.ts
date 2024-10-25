import db from "@/lib/db";

export async function findArticles() {
  const article = await db.article.findMany();
  return article;
}
