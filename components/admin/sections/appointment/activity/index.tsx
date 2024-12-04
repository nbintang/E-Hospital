"use client";
import { formatDate } from "@/helper/client";
import useAppointmentCalendar from "@/hooks/use-appointment-calendar";
import { AppointmentProps } from "@/types/appointment";
export default function AppoinmentActivity({
  appointments,
}: {
  appointments: AppointmentProps[];
}) {
  const { todayEvents: todayAppointments } = useAppointmentCalendar({
    appointments,
  });

  return todayAppointments.length > 0 ? (
    <ul className="space-y-4">
      {todayAppointments.map((appointment) => (
        <li key={appointment.id} className="bg-secondary p-4 rounded-lg">
          <p className="font-semibold">{appointment.patient}</p>
          <p className="text-sm">{appointment.locations.hospital}</p>
          <div className="mt-2 flex justify-between items-end">
            <p className="text-xs text-muted-foreground mt-1">
              Status: {appointment.title.split("(")[1].split(")")[0]}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDate({ date: appointment.start, format: "h:mm A" })}
            </p>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-muted-foreground">
      No appointments scheduled for today.
    </p>
  );
}
