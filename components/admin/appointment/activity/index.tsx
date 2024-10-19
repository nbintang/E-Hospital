import useAppointmentCalendar from "@/hooks/use-appointment-calendar";
import moment from "moment";

export default function AppoinmentActivity() {
  const { todayEvents } = useAppointmentCalendar();

  return todayEvents.length > 0 ? (
    <ul>
      {todayEvents.map((event) => (
        <li key={event.id} className="mb-2 p-2 bg-white rounded shadow">
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
  );
}
