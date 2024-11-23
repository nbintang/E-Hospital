import { Prisma } from "@prisma/client";

// Category type (simple)
export type CategoryProps = Prisma.CategoryGetPayload<{
  select: {
    id: true;
    slug: true;
    name: true;
    createdAt: true;
    updatedAt: true;
  }
}>;
