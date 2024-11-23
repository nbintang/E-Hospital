import { Prisma } from "@prisma/client";

export type OrderProps = Prisma.OrderGetPayload<{
  include: {
    medicine: {
      include: {
        categories: {
          select: {
            name: true;
          };
        };
      };
    };
    user: {
      select: {
        id: true;
        email: true;
        createdAt: true;
        updatedAt: true;
        password: true;
        role: true;
      };
    };
  };
}>;
