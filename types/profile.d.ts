import { Prisma } from "@prisma/client";

// Profile type with included user
export type ProfileProps = Prisma.ProfileGetPayload<{
  include: {
    user: {
      select: {
        email: true;
      }
    }
  }
}>;

