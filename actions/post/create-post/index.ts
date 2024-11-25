"use server";

import { formatCategoriesToSlugs, formatTitleToSlug } from "@/helper/common";
import { replaceBase64ToImgUrl, uploadToCloudinary } from "@/helper/server";
import { createArticles } from "@/repositories/articles.repository";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const mainImage = formData.get("image") as File;
    const category = formData.getAll("category") as string[];

    if (!title || !content || !mainImage || category.length === 0) {
      throw new Error("Missing required fields");
    }

    const categorySlugs = formatCategoriesToSlugs(category);
    const slug = formatTitleToSlug(title);
    const mainImg = await uploadToCloudinary(mainImage);
    const updatedContent = await replaceBase64ToImgUrl(content);

    const article = await createArticles({
      title,
      content: updatedContent,
      slug,
      imageUrl: mainImg.url,
      categorySlugs,
      doctorId: "7fe30d5c-3e52-407a-8fe5-331404bd887b",
    });
    if (!article.doctorId) {
      throw new Error("Doctor not authenticated");
    }

    revalidatePath("/dashboard/articles");
    return { success: true, data: article };
  } catch (error) {
    // Propagate the error so React Query or client-side handlers can catch it
    throw error instanceof Error
      ? error
      : new Error("Failed to create post");
  }
}
