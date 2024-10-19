import useAppointmentCalendar, {
  localizer,
} from "@/hooks/use-appointment-calendar";
import { Calendar } from "react-big-calendar";

export default function AppointmentCalendar() {
  const {
    events,
    selectedDate,
    view,
    handleSelectEvent,
    handleNavigate,
    handleViewChange,
  } = useAppointmentCalendar();
  return (
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
  );
}
