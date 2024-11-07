import { uploadToCloudinary } from "./upload-to-cloudinary";

const strToRoundedNum = (num: string) => Math.round(Number(num));

export async function replaceBase64Images(content: string) {
  // Regex to match <img> tags and extract src, width, and height
  const imgRegex =
    /<img\s+[^>]*src="([^"]+)"[^>]*width="([^"]+)"[^>]*height="([^"]+)"[^>]*>/g;
  let match;
  let updatedContent = content;

  while ((match = imgRegex.exec(content)) !== null) {
    // Extract src, width, and height
    const [_, base64Src, width, height] = match;
    const roundedWidth = strToRoundedNum(width);
    const roundedHeight = strToRoundedNum(height);

    if (base64Src.startsWith("data:image/")) {
      try {
        const { url } = await uploadToCloudinary(
          base64Src,
          true,
          roundedWidth,
          roundedHeight
        );

        const cloudinarySrc =
          `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/w_${roundedWidth},h_${roundedHeight}/` +
          url.split("/").slice(7).join("/");

        updatedContent = updatedContent.replace(base64Src, cloudinarySrc);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  }

  return updatedContent;
}
