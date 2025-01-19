"use server";

import { formatCategoriesToSlugs, formatTitleToSlug } from "@/helper/common";
import { replaceBase64ToImgUrl, uploadToCloudinary } from "@/helper/server";
import getAuthenticatedUserSession from "@/helper/server/get-authenticated-user-seesion";
import {
  findArticlesBySlugOrId,
  findDoctorByUserId,
  updateArticles,
} from "@/repositories/articles.repository";
import { revalidatePath } from "next/cache";

export async function updatePost(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const mainImage = formData.get("image") as File;
    const category = formData.getAll("categories") as string[];
    const articleId = formData.get("articleId") as string;
    const session = await getAuthenticatedUserSession();
    const doctorExist = await findDoctorByUserId(session?.user.id || "");
    if (!session) throw new Error("Unauthorized");
    if (!title || !content || !mainImage || category.length === 0) {
      throw new Error("Missing required fields");
    }
    const existingArticle = await findArticlesBySlugOrId({ id: articleId }); // Replace with your repository logic
    if (!existingArticle) {
      throw new Error("Article not found");
    }

    const categorySlugs = formatCategoriesToSlugs(category);
    const slug = formatTitleToSlug(title);
    const mainImg = await uploadToCloudinary({
      file: mainImage,
      folder: "articles",
    });
    const updatedContent = await replaceBase64ToImgUrl(content);

    const article = await updateArticles({
      title,
      content: updatedContent,
      slug,
      imageUrl: mainImg.url,
      categorySlugs,
      doctorId: doctorExist ? doctorExist.id : null,
    });

    revalidatePath("/dashboard/articles");
    return { success: true, data: article };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create post",
    };
  }
}
