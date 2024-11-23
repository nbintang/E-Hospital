import { Hospital } from "./../node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/.prisma/client/index.d";
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import { AppointmentProps } from "@/types/appointment";
import { capitalizeStr } from "@/helper/common";

export const localizer = momentLocalizer(moment);
export type EventProps = {
  id: string;
  patient: string;
  patientImg: string;
  title: string;
  start: string;
  end: string;
  status: string;
  locations: {
    hospital: string;
    address: string;
    coordinate: {
      latitude: number;
      longitude: number;
    };
  };
}
export default function useAppointmentCalendar({
  appointments,
}: {
  appointments: AppointmentProps[];
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, SetSelectedEvent] = useState<(EventProps) | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [view, setView] = useState<View>("month");

  const events = appointments.map((appointment: AppointmentProps) => {
    const patient = appointment.user.profile?.fullname;
    const hospital = appointment.doctor.hospital.name;
    const address = appointment.doctor.hospital.address.name;
    const coordinate = {
      latitude: appointment.doctor.hospital.address.latitude,
      longitude: appointment.doctor.hospital.address.longitude,
    };
    const patientImg = appointment.user.profile?.profileUrl;
    const startDate = new Date(appointment.dateTime); // Convert to Date object
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1); // Adjust for 1-day duration
  
    return {
      id: appointment.id,
      patient,
      patientImg,
      title: `Appointment (${capitalizeStr(appointment.status)})`,
      start: startDate, // Pass Date object here
      end: endDate, // Pass Date object here
      status: appointment.status,
      locations: {
        hospital,
        address,
        coordinate,
      },
    };
  });

  const handleSelectEvent = (event: any) => {
    SetSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleNavigate = (date: Date, view: View, action: string) => {
    setSelectedDate(date); // Ensure this is a Date object
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  const todayEvents = events.filter((event) =>
    moment(event.start).isSame(selectedDate, "day")
  );

  return {
    events,
    selectedDate,
    view,
    todayEvents,
    handleSelectEvent,
    handleNavigate,
    handleViewChange,
    isDialogOpen,
    selectedEvent,
    setIsDialogOpen,
  };
}
