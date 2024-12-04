import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AppointmentCalendar from "@/components/admin/sections/appointment/calendar";
import AppoinmentActivity from "@/components/admin/sections/appointment/activity";
import { findAppointmentsByDoctorId } from "@/repositories/appointments.repository";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import getServerSessionOptions from "@/helper/server/get-server-session";
import { findDoctorByUserId } from "@/repositories/articles.repository";
export default async function Appointment() {
  const session = await getServerSessionOptions();
  console.log(session);
  
  const doctorExist = await findDoctorByUserId(session.user.id);
  if (!doctorExist) {
    throw new Error("Unauthorized");
  }

  const appointments = await findAppointmentsByDoctorId({
    doctorId: doctorExist.id,
  });
  if (!appointments)
    return <p className="text-muted-foreground"> NO APPOINTMENTS </p>;

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Appointment Calendar</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <AppointmentCalendar appointments={appointments} />
        </div>
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <AppoinmentActivity appointments={appointments} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
