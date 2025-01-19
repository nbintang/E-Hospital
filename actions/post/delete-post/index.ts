"use server";

import { getAuthenticatedDoctor } from "@/helper/server/get-authenticated-doctor";
import authOptions from "@/lib/auth-options";
import {
  deleteArticles,
  findArticlesBySlugOrId,
} from "@/repositories/articles.repository";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function deletePost(articleId: string) {
  const existingArticle = await findArticlesBySlugOrId({ id: articleId });
  const session = await getServerSession(authOptions)

  await deleteArticles({ id: existingArticle?.id });
  revalidatePath("/dashboard/articles");
}
