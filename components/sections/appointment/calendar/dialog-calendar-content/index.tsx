import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { EventProps } from "@/hooks/use-appointment-calendar";
import { formatDate } from "@/helper/client";
export default function DialogCalendarContent({
  selectedEvent,
}: {
  selectedEvent: EventProps;
}) {
  return (
    <div className="grid gap-6 py-4">
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={selectedEvent.patientImg || `https://api.dicebear.com/6.x/initials/svg?seed=${selectedEvent?.patient}`}
          />
          <AvatarFallback>
            {selectedEvent?.patient
              ?.split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{selectedEvent?.patient}</h3>
          <p className="text-sm text-muted-foreground">Patient</p>
        </div>
      </div>
      <Separator />
      <div className="flex items-center flex-wrap justify-between gap-4">
        <div className="grid grid-cols-[25px_1fr] items-start gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {formatDate({
                date: new Date(selectedEvent?.start),
                format: "YYYY-MM-DD h:mm A",
              })}
            </p>
            <p className="text-sm text-muted-foreground">Date</p>
          </div>
        </div>
        <Separator orientation="vertical" className="h-12 hidden sm:flex" />
        <div className="grid grid-cols-[25px_1fr] items-start gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {formatDate({
                date: new Date(selectedEvent?.start),
                format: "YYYY-MM-DD h:mm A",
              }).slice(11)}
            </p>
            <p className="text-sm text-muted-foreground">Time</p>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-secondary p-4">
        <h4 className="mb-2 font-semibold">
          {selectedEvent?.locations.hospital}
        </h4>
        <p className="text-sm text-muted-foreground">
          {selectedEvent?.locations.address}
        </p>
        <div>
          <div className="flex justify-end">
            <Button className="" variant={"outline"} size="sm" asChild>
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${selectedEvent?.locations.coordinate.latitude},${selectedEvent?.locations.coordinate.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Map
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Badge
        variant={
          selectedEvent?.status === "CONFIRMED" ? "success" : "secondary"
        }
        className="w-fit"
      >
        {selectedEvent?.status &&
          selectedEvent.status.charAt(0) + selectedEvent.status.slice(1)}
      </Badge>
    </div>
  );
}
