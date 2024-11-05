"use server";

import {
  formatCategoriesToSlugs,
  formatTitleToSlug,
} from "@/helper/format-title-to-slug";
import replaceBase64Images from "@/helper/replace-base64-images";
import uploadToCloudinary from "@/helper/upload-to-cloudinary";
import { createArticles } from "@/repositories/articles.repository";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const mainImage = formData.get("image") as File;
  const category = formData.getAll("category") as string[];
  const categorySlugs = formatCategoriesToSlugs(category);
  const slug = formatTitleToSlug(title);

  // Upload main image
  const mainImageUrl = await uploadToCloudinary(mainImage);
  const updatedContent = await replaceBase64Images(content);
  const articles = await createArticles({
    title,
    content: updatedContent,
    slug,
    imageUrl: mainImageUrl,
    categorySlugs,
    doctorId: "f0cacf7f-dc89-419c-8d3e-c55ea6f1cda9",
  });

  revalidatePath("/dashboard/articles/drafts");
}
