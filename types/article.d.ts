import { Prisma } from "@prisma/client";

// Article type with doctor and categories
export type ArticleProps = Prisma.ArticleGetPayload<{
  include: {
    doctor: {
      include: {
        user: {
          include: {
            profile: {
              select: {
                fullname: true;
              }
            }
          }
        }
      }
    };
    categories: true;
  }
}>;



export type ArticleBySlugProps = Prisma.ArticleGetPayload<{
  include:{
    categories: true
  }
}>