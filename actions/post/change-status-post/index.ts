"use server";
import { getAuthenticatedDoctor } from "@/helper/server/get-authenticated-doctor";
import {
  findArticlesBySlugOrId,
  updateArticleStatus,
} from "@/repositories/articles.repository";
import { ArticleStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function changeStatusArticles({
  id,
  status,
}: {
  id: string;
  status: ArticleStatus;
}) {
  const existingArticle = await findArticlesBySlugOrId({ id });
  const authenticatedUser = await getAuthenticatedDoctor();
  if (existingArticle?.doctorId !== authenticatedUser?.id)
    throw new Error("Unauthorized");
  await updateArticleStatus({ id: existingArticle?.id, status });
  revalidatePath("/dashboard/articles");
}
