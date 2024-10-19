"use client";
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

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

export default function AppointmentCalendar() {
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

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Appointment Calendar</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="h-[600px]">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleSelectEvent}
              onNavigate={handleNavigate}
              view={view}
              onView={handleViewChange}
              views={["month", "week", "day", "agenda"]}
              date={selectedDate}
              toolbar={true}
            />
          </div>
        </div>
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-2">Today's Activities</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            {todayEvents.length > 0 ? (
              <ul>
                {todayEvents.map((event) => (
                  <li
                    key={event.id}
                    className="mb-2 p-2 bg-white rounded shadow"
                  >
                    <p className="font-semibold">{event.title}</p>
                    <p>
                      {moment(event.start).format("h:mm A")} -{" "}
                      {moment(event.end).format("h:mm A")}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No appointments scheduled for today.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
