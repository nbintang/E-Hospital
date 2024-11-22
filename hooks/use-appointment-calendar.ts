import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AppointmentProps } from "@/types/appointment";
import { capitalizeStr } from "@/helper/common";

export const localizer = momentLocalizer(moment);
type SelectedEventProps = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
};
export default function useAppointmentCalendar({
  appointments,
}: {
  appointments: AppointmentProps[];
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, SetSelectedEvent] = useState<SelectedEventProps | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [view, setView] = useState<View>("month");
  const events = appointments.map((appointment: AppointmentProps) => ({
    id: appointment.id,
    title: `Appointment (${capitalizeStr(appointment.status)})`,
    start: appointment.dateTime,
    end: moment(appointment.dateTime).add(1, "hour").toDate(),
    allDay: false,
  }));

  const handleSelectEvent = (event: any) => {
    SetSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleNavigate = (date: Date, view: View, action: string) => {
    setSelectedDate(date);
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
