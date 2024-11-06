import {uploadToCloudinary} from "./upload-to-cloudinary";

export  async function replaceBase64Images(content: string) {
  // Regex to capture src, width, and height attributes
  const imgTagRegex = /<img[^>]+src=["'](data:image\/[^"']+)["'][^>]*width=["'](\d+)["'][^>]*height=["'](\d+)["'][^>]*>/g;
  let match;
  const uploadPromises = [];

  while ((match = imgTagRegex.exec(content)) !== null) {
    const base64Data = match[1];
    const width = match[2];
    const height = match[3];

    // Upload each image with Cloudinary transformations for width and height
    const uploadPromise = uploadToCloudinary(base64Data, true).then((url) => {
      return `<img src="${url}" width="${width}" height="${height}" alt="Image Articles" />`;
    });

    uploadPromises.push(uploadPromise);
  }

  // Await all uploads and replace in content
  const updatedImages = await Promise.all(uploadPromises);
  let updatedContent = content;
  updatedImages.forEach((imgTag, index) => {
    updatedContent = updatedContent.replace(imgTagRegex, imgTag);
  });

  return updatedContent;
}
