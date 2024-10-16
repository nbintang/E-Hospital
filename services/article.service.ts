import { cloudinary } from "@/lib/cld";


export const getArticles = async () => {
    const articles = await cloudinary.api.resources_by_tag("")
}