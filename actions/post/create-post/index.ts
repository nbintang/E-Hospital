"use server";

import replaceBase64Images from "@/helper/replace-base64-images";
import uploadToCloudinary from "@/helper/upload-to-cloudinary";
import { cloudinary } from "@/lib/cld";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const mainImage = formData.get("image") as File;
  // Upload main image
  const mainImageUrl = await uploadToCloudinary(mainImage);

  // Replace base64 images in content and update content
  const updatedContent = await replaceBase64Images(content);
  console.log(updatedContent);
  console.log(mainImageUrl);

  revalidatePath("/dashboard/articles/drafts");
}
