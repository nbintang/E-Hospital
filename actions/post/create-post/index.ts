"use server";

import { cloudinary } from "@/lib/cld";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as File;
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  console.log(title, content, buffer);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: "tes",
          folder: "tes",
          tags: ["posts-from-nextjs"],
          upload_preset: "ml_default",
        },
        function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          console.log(result);

          resolve(result);
        }
      )
      .end(buffer);
  });
  
  revalidatePath("/dashboard/articles/drafts");
}
