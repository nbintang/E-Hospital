"use server";
import { updateArticleStatus } from '@/repositories/articles.repository';
import { ArticleStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function changeStatusArticles({ id, status }: { id: string; status: ArticleStatus }) {
    await updateArticleStatus({ id, status });
    revalidatePath("/dashboard/articles");
}