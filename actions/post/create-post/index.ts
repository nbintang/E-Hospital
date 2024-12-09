"use server";

import { formatCategoriesToSlugs, formatTitleToSlug } from "@/helper/common";
import { replaceBase64ToImgUrl, uploadToCloudinary } from "@/helper/server";
import getAuthenticatedUserSession from "@/helper/server/get-authenticated-user-seesion";

import {
  createArticles,
  findDoctorByUserId,
} from "@/repositories/articles.repository";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const mainImage = formData.get("image") as File;
    const category = formData.getAll("category") as string[];
    const session = await getAuthenticatedUserSession();
    const doctorExist = await findDoctorByUserId(session?.user.id || "");
    console.log(doctorExist);
    
    if (!doctorExist) throw new Error("Doctor not authenticated");
    if (!title || !content || !mainImage || category.length === 0) {
      throw new Error("Missing required fields");
    }
    const categorySlugs = formatCategoriesToSlugs(category);
    const slug = formatTitleToSlug(title);
    const mainImg = await uploadToCloudinary({
      file: mainImage,
      folder: "articles",
    });
    const updatedContent = await replaceBase64ToImgUrl(content);

    const article = await createArticles({
      title,
      content: updatedContent,
      slug,
      imageUrl: mainImg.url,
      categorySlugs,
      doctorId: doctorExist.id,
    });
    if (!article.doctorId) {
      throw new Error("Doctor not authenticated");
    }

    revalidatePath("/dashboard/articles");
    return { success: true, data: article };
  } catch (error) {
    throw error instanceof Error ? error : new Error("Failed to create post");
  }
}
