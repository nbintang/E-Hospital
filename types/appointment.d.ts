import { Prisma } from "@prisma/client";

export type AppointmentProps = Prisma.AppointmentGetPayload<{
  include: {
    user:{
      select: {
        profile: {
          select: {
            profileUrl: true,
            fullname: true;
          };
        };
      };
    }
    doctor: {
      select: {
        user: {
          select: {
            profile: {
              select: {
                fullname: true;
              };
            };
          };
        };
        hospital: {
          include:{
            address: {
              select:{
                name: true,
                latitude: true,
                longitude: true
              }
            };
          }
        };
        specialization: true;
      };
    };
  };
}>;
