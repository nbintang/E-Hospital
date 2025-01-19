"use server";
import db from "@/lib/db";
import { formatSlugToTitle } from "@/helper/common";
import { ArticleStatus } from "@prisma/client";
import { ArticleByIdProps, ArticleProps } from "@/types/article";

export async function findArticlesByDoctorId({
  createdBy,
}: {
  createdBy?: string;
}): Promise<ArticleProps[]> {
  const article = await db.article.findMany({
    where: {
      doctorId: createdBy,
    },
    include: {
      categories: true,
      doctor: {
        include: {
          user: {
            select: {
              profile: {
                select: {
                  fullname: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return article;
}

export async function findAllArticles(): Promise<ArticleProps[]> {
  return await db.article.findMany({
    where:{
      status: "PUBLISHED"
    },
    include: {
      categories: true,
      doctor: {
        include: {
          user: {
            select: {
              profile: {
                select: {
                  fullname: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

export async function findDoctorByUserId(id: string) {
  console.log(id);

  return await db.doctor.findFirst({ where: { userId: id } });
}

export async function createArticles({
  title,
  content,
  slug,
  imageUrl,
  doctorId,
  status = "DRAFT",
  categorySlugs,
}: {
  title: string;
  content: string;
  slug: string;
  imageUrl: string;
  status?: ArticleStatus;
  doctorId: string | null;
  categorySlugs: string[];
}) {
  const article = await db.article.create({
    data: {
      title,
      content,
      slug,
      imageUrl,
      status,
      doctorId,
      categories: {
        connectOrCreate: categorySlugs.map((slug) => ({
          where: { slug },
          create: {
            name: formatSlugToTitle(slug),
            slug,
          },
        })),
      },
    },
  });
  return article;
}
export async function updateArticles({
  title,
  content,
  slug,
  imageUrl,
  status = "DRAFT",
  categorySlugs,
  doctorId,
}: {
  title: string;
  content: string;
  slug: string;
  imageUrl: string;
  status?: ArticleStatus;
  doctorId: string | null;
  categorySlugs: string[];
}) {
  return await db.article.update({
    where: { slug },
    data: {
      title,
      content,
      slug,
      imageUrl,
      status,
      doctorId,
      categories: {
        upsert: categorySlugs.map((slug) => ({
          where: { slug },
          update: {
            name: formatSlugToTitle(slug),
            slug,
          },
          create: {
            name: formatSlugToTitle(slug),
            slug,
          },
        })),
      },
    },
  });
}

export async function findArticlesBySlugOrId({
  slug,
  id,
  status,
}: {
  slug?: string;
  id?: string;
  status?: ArticleStatus;
}): Promise<ArticleByIdProps | null> {
  return await db.article.findUnique({
    where: { id, slug, status },
    include: {
      categories: true,
      doctor: {
        select: {
          specialization: {
            select: {
              name: true,
            },
          },
          user: {
            select: {
              email: true,
              profile: {
                select: {
                  fullname: true,
                  profileUrl: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

export async function deleteArticles({ id }: { id?: string }) {
  return await db.article.delete({ where: { id } });
}

export async function updateArticleStatus({
  id,
  status,
}: {
  id?: string;
  status: ArticleStatus;
}) {
  return await db.article.update({ where: { id }, data: { status } });
}

export async function findArticlesByPage({
  currentPage,
  itemsPerPage,
  status,
}: {
  currentPage: number;
  itemsPerPage: number;
  status?: ArticleStatus;
}): Promise<ArticleProps[]> {
  const article = await db.article.findMany({
    where: { status },
    include: {
      categories: true,
      doctor: {
        include: {
          user: {
            select: {
              profile: {
                select: {
                  fullname: true,
                },
              },
            },
          },
        },
      },
    },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });
  return article;
}

export const findTotalArticles = async () => {
  return await db.article.count();
};
