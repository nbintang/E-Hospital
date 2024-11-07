import { cloudinary } from "@/lib/cld";

// Max allowed dimensions (Cloudinary limit)
const MAX_DIMENSION = 65500;

export async function uploadToCloudinary(
  file: File | string,
  isBase64 = false,
  width?: number,
  height?: number
): Promise<{ url: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    // Check if dimensions exceed the Cloudinary max limit
    if (width && height) {
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        // Resize dimensions to fit within the limit
        const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
    }

    let uploadOptions: Record<string, any> = {
      folder: "articles",
      upload_preset: "ml_default",
    };

    // Apply resize transformations if width and height are provided
    if (width && height) {
      uploadOptions.transformation = [
        { width, height, crop: "scale" },  // Resize image
      ];
    }

    // Upload base64 or file accordingly
    if (isBase64 || typeof file === "string") {
      // Upload base64 directly
      cloudinary.uploader.upload(file.toString(), uploadOptions, (error, result) => {
        if (error) reject(error);
        else resolve({
          url: result?.secure_url as string,
          width: result?.width || 0,
          height: result?.height || 0
        });
      });
    } else if (file instanceof File) {
      // Upload file directly
      file.arrayBuffer().then((arrayBuffer) => {
        const buffer = Buffer.from(arrayBuffer);
        cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
          if (error) reject(error);
          else resolve({
            url: result?.secure_url as string,
            width: result?.width || 0,
            height: result?.height || 0
          });
        }).end(buffer);
      }).catch(reject);
    } else {
      reject(new Error("Invalid file type."));
    }
  });
}
