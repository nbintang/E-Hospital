"use client";
import useAppointmentCalendar, {
  localizer,
} from "@/hooks/use-appointment-calendar";
import { AppointmentProps } from "@/types/appointment";
import { Calendar as BigCalendar } from "react-big-calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CustomToolbar from "./calendar-toolbar";
import DialogCalendarContent from "./dialog-calendar-content";
export default function AppointmentCalendar({
  appointments,
}: {
  appointments: AppointmentProps[];
}) {
  const {
    events,
    selectedDate,
    view,
    handleSelectEvent,
    handleNavigate,
    handleViewChange,
    isDialogOpen,
    setIsDialogOpen,

    selectedEvent,
  } = useAppointmentCalendar({ appointments });

  return (
    <>
      <div className="max-w-[1000px] overflow-x-auto mx-auto">
        <div className="min-w-[800px]">
          {/* @ts-ignore */}
          <BigCalendar
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
            components={{
              toolbar: CustomToolbar, // Use the custom toolbar here
            }}
            style={{ height: 500 }}
          />
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Appointment Details
            </DialogTitle>
            <DialogDescription>
              View and manage your upcoming appointment.
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <DialogCalendarContent selectedEvent={selectedEvent} />
          )}
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="blue" onClick={() => setIsDialogOpen(false)}>
              Confirm Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
