"use server";
import db from "@/lib/db";
import { AppointmentProps } from "@/types/appointment";
export async function findAppointmentsByDoctorId({
  doctorId,
}: {
  doctorId: string;
}): Promise<AppointmentProps[]> {
  console.log("Doctor ID:", doctorId);

  return await db.appointment.findMany({
    where: {
   user:{
    id: doctorId
   }
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
