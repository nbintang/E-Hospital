import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";


export const localizer = momentLocalizer(moment);

type AppointmentStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

interface Appointment {
  id: string;
  userId: string;
  doctorId: string;
  hospitalId: string;
  dateTime: Date;
  status: AppointmentStatus;
  createdAt: Date;
  updatedAt: Date;
}
export default function useAppointmentCalendar() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState<View>("month");
  
    const fetchAppointments = async () => {
      // Mock appointments data
      const mockAppointments: Appointment[] = [
        {
          id: "1",
          userId: "user1",
          doctorId: "doctor1",
          hospitalId: "hospital1",
          dateTime: new Date(2024, 9, 15, 10, 0),
          status: "PENDING",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          userId: "user2",
          doctorId: "doctor2",
          hospitalId: "hospital1",
          dateTime: new Date(2024, 9, 15, 14, 30),
          status: "CONFIRMED",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3",
          userId: "user3",
          doctorId: "doctor1",
          hospitalId: "hospital2",
          dateTime: new Date(2024, 9, 16, 11, 0),
          status: "CANCELLED",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      setAppointments(mockAppointments);
    };
  
    useEffect(() => {
      fetchAppointments();
    }, []);
  
    const events = appointments.map((appointment) => ({
      id: appointment.id,
      title: `Appointment (${appointment.status})`,
      start: appointment.dateTime,
      end: moment(appointment.dateTime).add(1, "hour").toDate(),
      allDay: false,
    }));
  
    const handleSelectEvent = (event: any) => {
      alert(`Appointment selected: ${event.title}`);
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
    }
}