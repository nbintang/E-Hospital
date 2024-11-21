"use server";


import { deleteArticles } from "@/repositories/articles.repository";
import { revalidatePath } from "next/cache";

export async function deletePost(id: string) {
    await deleteArticles({ id });
    revalidatePath("/dashboard/articles");
}
