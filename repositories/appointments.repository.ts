"use server";
import db from "@/lib/db";
import { AppointmentProps } from "@/types/appointment";
import { Prisma } from "@prisma/client";
export async function findAppointmentsByDoctorId({
  doctorId,
}: {
  doctorId: string;
}): Promise<AppointmentProps[]> {

  return await db.appointment.findMany({
    where: {
   doctorId
    },
    include: {
      user: {
        select: {
          profile: {
            select: {
              fullname: true,
              profileUrl: true,
            },
          },
        },
      },
      doctor: {
        select: {
          user: {
            select: {
              profile: {
                select: {
                  fullname: true,
                },
              },
            },
          },
          hospital: {
            include: {
              address: {
                select: {
                  name: true,
                  latitude: true,
                  longitude: true,
                },
              },
            },
          },
          specialization: true,
        },
      },
    },
  });
}


export async function createAppointments(input: Prisma.AppointmentCreateInput) {
  return await db.appointment.create({ data: input });
}