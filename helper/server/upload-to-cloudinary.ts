import { cloudinary } from "@/lib/cld";

const MAX_DIMENSION = 65500;

export async function uploadToCloudinary({
  folder,
  file,
  isBase64 = false,
  width,
  height,
}: {
  folder?: string;
  file: File | string;
  isBase64?: boolean;
  width?: number;
  height?: number;
}): Promise<{ url: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    if (width && height) {
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
    }

    let uploadOptions: Record<string, any> = {
      folder,
      upload_preset: "ml_default",
    };
    if (width && height) {
      uploadOptions.transformation = [{ width, height, crop: "scale" }];
    }

    if (isBase64 || typeof file === "string") {
      cloudinary.uploader.upload(
        file.toString(),
        uploadOptions,
        (error, result) => {
          if (error) reject(error);
          else
            resolve({
              url: result?.secure_url as string,
              width: result?.width || 200,
              height: result?.height || 200,
            });
        }
      );
    } else if (file instanceof File) {
      file
        .arrayBuffer()
        .then((arrayBuffer) => {
          const buffer = Buffer.from(arrayBuffer);
          cloudinary.uploader
            .upload_stream(uploadOptions, (error, result) => {
              if (error) reject(error);
              else
                resolve({
                  url: result?.secure_url as string,
                  width: result?.width || 200,
                  height: result?.height || 200,
                });
            })
            .end(buffer);
        })
        .catch(reject);
    } else {
      reject(new Error("Invalid file type."));
    }
  });
}
