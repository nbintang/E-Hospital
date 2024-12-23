import AppointmentForm from "@/components/public/appointment/appointment-form";
import ProfileMissingFieldsDialog from "@/components/public/profile-missing-fields-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import getAuthenticatedUserSession from "@/helper/server/get-authenticated-user-seesion";
import db from "@/lib/db";
import React from "react";

export default async function Appointment() {
  const doctors = await db.doctor.findMany({
    where: {
      user: {
        role: "DOCTOR",
      },
    },
    include: {
      specialization: true,
      hospital: {
        include: {
          address: true,
        },
      },
      user: { include: { profile: true } },
    },
  });
  const session = await getAuthenticatedUserSession();

  

 
  return (
    <>
      <div className="container mx-auto p-4 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Appointment Booking</h1>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Book an Appointment</CardTitle>
            <CardDescription>
              Choose a doctor and schedule your appointment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AppointmentForm session={session} doctors={doctors} />
          </CardContent>
        </Card>
      </div>

      <ProfileMissingFieldsDialog/>
    </>
  );
}
