"use server";
import { getAuthenticatedDoctor } from "@/helper/server/get-authenticated-doctor";
import authOptions from "@/lib/auth-options";
import {
  findArticlesBySlugOrId,
  updateArticleStatus,
} from "@/repositories/articles.repository";
import { ArticleStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function changeStatusArticles({
  id,
  status,
}: {
  id: string;
  status: ArticleStatus;
}) {
  const existingArticle = await findArticlesBySlugOrId({ id });
  const session = await getServerSession(authOptions);
  if(!session) throw new Error("Unauthorized");
  await updateArticleStatus({ id: existingArticle?.id, status });
  revalidatePath("/dashboard/articles");
}
