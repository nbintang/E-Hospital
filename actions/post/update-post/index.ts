"use server";

import { formatCategoriesToSlugs, formatTitleToSlug } from "@/helper/common";
import { replaceBase64ToImgUrl, uploadToCloudinary } from "@/helper/server";
import { createArticles, updateArticles } from "@/repositories/articles.repository";
import { revalidatePath } from "next/cache";

export async function updatePost(formData: FormData) {
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

    const article = await updateArticles({
      title,
      content: updatedContent,
      slug,
      imageUrl: mainImg.url,
      categorySlugs,
      doctorId: "84c025d2-fa87-482b-a661-3e9fdf86f024",
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
