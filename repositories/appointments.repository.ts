import db from "@/lib/db";
import {  AppointmentProps } from "@/types/appointment";

export async function findAppointmentsByDoctorId({ doctorId }: { doctorId: string }) : Promise<AppointmentProps[] | null> {
  return await db.appointment.findMany({
    where: {
      doctorId,
    },
  });
}