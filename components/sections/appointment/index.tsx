
import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AppointmentCalendar from "@/components/sections/appointment/calendar";
import AppoinmentActivity from "@/components/sections/appointment/activity";
import { findAppointmentsByDoctorId } from "@/repositories/appointments.repository";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
export default async function Appointment() {
  const doctorId = "7fe30d5c-3e52-407a-8fe5-331404bd887b";
  const appointments = await findAppointmentsByDoctorId({ doctorId });

  if (!appointments) return null;
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
