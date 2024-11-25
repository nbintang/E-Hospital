
import db from "@/lib/db";
import { formatSlugToTitle } from "@/helper/common";
import { ArticleStatus } from "@prisma/client";
import { ArticleBySlugProps, ArticleProps } from "@/types/article";

export async function findArticles(): Promise<ArticleProps[]> {
  const article = await db.article.findMany({
    include: {
      categories: true,
      doctor: {
        include:{
          user: {
            select: {
              profile: {
                select: {
                  fullname: true
                }
              }
            }
          }
        }
      },
    },
  });
  return article;
}

export async function findDoctorById(id: string) {
  return await db.doctor.findFirst({ where: { id } });
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
  doctorId: string;
  categorySlugs: string[];
}) {
  const doctor = await findDoctorById(doctorId);
  if (!doctor) throw new Error("Doctor Unauthorized");
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

  if (article.doctorId !== doctorId) throw new Error("Doctor Unauthorized");
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
  doctorId: string;
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
        }))
      },
    },
  });
}

export async function findArticlesBySlug({ slug }: { slug: string }): Promise<ArticleBySlugProps | null> {
  return await db.article.findUnique({
    where: { slug },
    include: {
      categories: true,
    },
  });
}


export async function deleteArticles({ id }: { id: string }) {
  return await db.article.delete({ where: { id } });
}

export async function updateArticleStatus({ id, status }: { id: string; status: ArticleStatus }) {
  return await db.article.update({ where: { id }, data: { status } });
}