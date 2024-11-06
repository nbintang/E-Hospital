import { uploadToCloudinary } from "./upload-to-cloudinary";

export async function replaceBase64Images(content: string) {
  // Regex to match img tags with base64 src, capturing width and height if available
  const imgTagRegex = /<img[^>]+src=["'](data:image\/[^"']+)["'][^>]*?(?:width=["'](\d+)["'])?[^>]*?(?:height=["'](\d+)["'])?[^>]*>/g;

  const uploadPromises = [] as Promise<{ placeholder: string; imgTag: string; width: number; height: number }>[];
  let match;
  let placeholderIndex = 0;

  while ((match = imgTagRegex.exec(content)) !== null) {
    const base64Data = match[1];
    const width = match[2] ? parseInt(match[2]) : 0;
    const height = match[3] ? parseInt(match[3]) : 0;

    const placeholder = `__IMG_PLACEHOLDER_${placeholderIndex++}__`;
    content = content.replace(match[0], placeholder);

    // Upload image to Cloudinary and get the URL and actual dimensions in a promise
    const uploadPromise = uploadToCloudinary(base64Data, true).then((result) => {
      // Return the image tag with the actual width and height
      return {
        placeholder,
        imgTag: `<img src="${result.url}" width="${result.width}" height="${result.height}" alt="Image Articles" />`,
        width: result.width,
        height: result.height,
      };
    });

    uploadPromises.push(uploadPromise);
  }

  // Await all Cloudinary uploads and replace placeholders with the final img tags
  const uploadedImages = await Promise.all(uploadPromises);
  uploadedImages.forEach(({ placeholder, imgTag }) => {
    content = content.replace(placeholder, imgTag);
  });

  return content;
}