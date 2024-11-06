"use server";

import {
  formatCategoriesToSlugs,
  formatTitleToSlug,
  replaceBase64Images,
  uploadToCloudinary,
} from "@/helper";
import db from "@/lib/db";
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
    const updatedContent = await replaceBase64Images(content);
    const article = await createArticles({
      title,
      content: updatedContent,
      slug,
      imageUrl: mainImg.url,
      categorySlugs,
      doctorId: "f0cacf7f-dc89-419c-8d3e-c55ea6f1cda9",
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
