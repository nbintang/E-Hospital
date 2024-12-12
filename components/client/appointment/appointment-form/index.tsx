"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

import { Appointment, Doctor, Hospital, Prisma } from "@prisma/client";
import moment from "moment";

const formSchema = z.object({
  hospitalId: z.string().min(1, "Please select a hospital"),
  doctorId: z.string().min(1, "Please select a doctor"),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string().min(1, "Please select a time"),
});

interface AppointmentFormProps {
  doctors: Prisma.DoctorGetPayload<{
    include: {specialization: true; user: { include: { profile: true } } };
  }>[];
  hospitals: Hospital[];
  onSubmit: (
    appointment: Omit<Appointment, "id" | "createdAt" | "updatedAt">
  ) => void;
  userId: string;
}

export default function AppointmentForm({
  doctors,
  hospitals,
  onSubmit,
  userId,
}: AppointmentFormProps) {
  const [availableDoctors, setAvailableDoctors] = useState(doctors);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hospitalId: "",
      doctorId: "",
      time: "",
    },
  });

  useEffect(() => {
    const hospitalId = form.watch("hospitalId");
    if (hospitalId) {
      setAvailableDoctors(
        doctors.filter((doctor) => doctor.hospitalId === hospitalId)
      );
    } else {
      setAvailableDoctors(doctors);
    }
  }, [form.watch("hospitalId"), doctors]);

  function onFormSubmit(values: z.infer<typeof formSchema>) {
    const dateTime = new Date(values.date);
    const [hours, minutes] = values.time.split(":");
    dateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));

    onSubmit({
      userId,
      doctorId: values.doctorId,
      hospitalId: values.hospitalId,
      dateTime,
      status: "PENDING",
    } as Omit<Appointment, "id" | "createdAt" | "updatedAt">);

    console.log(values);
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="hospitalId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hospital</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a hospital" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {hospitals.map((hospital) => (
                    <SelectItem key={hospital.id} value={hospital.id}>
                      {hospital.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the hospital for your appointment
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="doctorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Doctor</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableDoctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.user.profile?.fullname} -{" "}
                      {doctor.specialization.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the doctor for your appointment
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        moment(field.value).format("MMMM Do YYYY")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() ||
                      date >
                        new Date(new Date().setMonth(new Date().getMonth() + 3))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select the date for your appointment
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from({ length: 8 }, (_, i) => i + 9).map((hour) => (
                    <SelectItem key={hour} value={`${hour}:00`}>
                      {`${hour}:00`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the time for your appointment
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Book Appointment</Button>
      </form>
    </Form>
  );
}
