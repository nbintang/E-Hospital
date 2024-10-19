"use client";
import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AppointmentCalendar from "./calendar";
import AppoinmentActivity from "./activity";

export default function Appointment() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Appointment Calendar</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="h-[600px]">
            <AppointmentCalendar />
          </div>
        </div>
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-2">Today's Activities</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <AppoinmentActivity />
          </div>
        </div>
      </div>
    </>
  );
}
