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
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "@/helper/client";
import { Button } from "@/components/ui/button";

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
      />
      <Dialog open={isDialogOpen}>
        {selectedEvent ? (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedEvent?.title}</DialogTitle>
              <DialogDescription>Event Details</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">ID:</span>
                <span className="col-span-3">{selectedEvent?.id}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Start:</span>
                <span className="col-span-3">
                  {formatDate({
                    date: selectedEvent?.start,
                    format: "DD-MMM-YYYY",
                  })}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">End:</span>
                <span className="col-span-3">
                  {formatDate({
                    date: selectedEvent?.end,
                    format: "DD-MMM-YYYY",
                  })}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">All Day:</span>
                <span className="col-span-3">
                  {selectedEvent?.allDay ? "Yes" : "No"}
                </span>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        ) : (
          <div>Something Went Wrong </div>
        )}
      </Dialog>
    </>
  );
}
