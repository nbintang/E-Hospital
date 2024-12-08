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
              };
            };
          };
        };
      };
    };
    categories: true;
  };
}>;

export type ArticleByIdProps = Prisma.ArticleGetPayload<{
  include: {
    categories: true;
    doctor: {
      select: {
        specialization: {
          select: {
            name: true;
          };
        };
        user: {
          select: {
            email: true;
            profile: {
              select: {
                fullname: true;
                profileUrl: true;
              };
            };
          };
        };
      };
    };
  };
}>;
