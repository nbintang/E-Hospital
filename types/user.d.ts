import { Prisma } from "@prisma/client";

export type UserProps = Prisma.UserGetPayload<{
  id: true;
  email: true;
  createdAt: true;
  updatedAt: true;
  profile: {
    select: {
      fullname: true;
    };
  };
}>;
