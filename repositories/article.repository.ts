import db from "@/lib/db";

export const findArticles = async () => {
  const article = await db.article.findMany();
  return article;
};
