import { cloudinary } from "@/lib/cld";

export async function uploadToCloudinary(file: File | string, isBase64 = false): Promise<{ url: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    if (isBase64 || typeof file === "string") {
      // Upload the base64 string directly
      cloudinary.uploader.upload(file.toString(), {
        folder: "articles",
        upload_preset: "ml_default",
      }, function (error, result) {
        if (error) reject(error);
        else resolve({ url: result?.secure_url as string, width: result?.width || 0, height: result?.height || 0 });
      });
    } else if (file instanceof File) {
      // Convert the File object to a buffer and upload
      file.arrayBuffer().then((arrayBuffer) => {
        const buffer = Buffer.from(arrayBuffer);
        cloudinary.uploader.upload_stream(
          {
            folder: "articles",
            upload_preset: "ml_default",
          },
          function (error, result) {
            if (error) reject(error);
            else resolve({ url: result?.secure_url as string, width: result?.width || 0, height: result?.height || 0 });
          }
        ).end(buffer);
      }).catch(reject);
    } else {
      reject(new Error("Invalid file type."));
    }
  });
}