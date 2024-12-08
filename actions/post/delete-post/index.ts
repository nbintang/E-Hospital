"use server";

import { getAuthenticatedDoctor } from "@/helper/server/get-authenticated-doctor";
import {
  deleteArticles,
  findArticlesBySlugOrId,
} from "@/repositories/articles.repository";
import { revalidatePath } from "next/cache";

export async function deletePost(articleId: string) {
  const existingArticle = await findArticlesBySlugOrId({ id: articleId });
  const authenticatedUser = await getAuthenticatedDoctor();

  if (existingArticle?.doctorId !== authenticatedUser?.id)
    throw new Error("Unauthorized");

  await deleteArticles({ id: existingArticle?.id });
  revalidatePath("/dashboard/articles");
}
