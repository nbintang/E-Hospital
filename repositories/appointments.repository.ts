import db from "@/lib/db";
import { AppointmentProps } from "@/types/appointment";
import { findDoctorById } from "./articles.repository";

export async function findAppointmentsByDoctorId({ 
  doctorId 
}: { 
  doctorId: string 
}): Promise<AppointmentProps[]> {
  const doctorExist = await findDoctorById(doctorId);
  if(!doctorExist) throw new Error("Unauthorized");
  return await db.appointment.findMany({
    where: {
      doctorId,
    },
  include:{
    user:{
      select:{
        profile: {
          select: {
            fullname: true,
            profileUrl: true
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
          include:{
            address: {
              select:{
                name: true,
                latitude: true,
                longitude: true
              }
            },
          }
        },
        specialization: true,
      },
    },
  }
  });
}