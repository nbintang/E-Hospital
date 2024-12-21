"use client";

import { useEffect } from "react";
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
import { CalendarIcon, UserSearch } from "lucide-react";

import { Prisma } from "@prisma/client";
import moment from "moment";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import useOpenAuthDialog from "@/hooks/dialog/use-open-auth-dialog";
import { createAppointments } from "@/repositories/appointments.repository";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useOpenDoctorDetailsDialog from "@/hooks/dialog/use-open-doctor-details-dialog";

const formSchema = z.object({
  doctorId: z.string().min(1, "Please select a doctor"),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string().min(1, "Please select a time"),
});
export type DoctorsProps = Prisma.DoctorGetPayload<{
  include: {
    specialization: true;
    hospital: {
      include: {
        address: true;
      };
    };
    user: { include: { profile: true } };
  };
}>[];

interface AppointmentFormProps {
  doctors: DoctorsProps;
  session: Session | null;
}

export default function AppointmentForm({
  doctors,
  session,
}: AppointmentFormProps) {
  const {  setShowDetails } = useOpenDoctorDetailsDialog()
  const router = useRouter();
  const { setShowSignIn: setShowSignInDialog } = useOpenAuthDialog();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctorId: "",
      time: "",
    },
  });
  useEffect(() => {
    if (!session) {
      setShowSignInDialog(true);
      form.reset();
    }
  }, [session, setShowSignInDialog]);

  async function onFormSubmit(values: z.infer<typeof formSchema>) {
    if (!session) {
      setShowSignInDialog(true);
      form.reset();
      return;
    }
    const dateTime = new Date(values.date);
    const [hours, minutes] = values.time.split(":");
    dateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    const result = await createAppointments({
      doctor: {
        connect: {
          id: values.doctorId,
        },
      },
      hospital: {
        connect: {
          id: doctors.find((doctor) => doctor.id === values.doctorId)?.hospital
            .id,
        },
      },
      dateTime: values.date,
      user: {
        connect: {
          id: session.user.id,
        },
      },
    });

    toast.promise(Promise.resolve(result), {
      loading: "Memproses...",
      success: "Berhasil Membuat Jadwal Konsultasi",
      error: "Terjadi kesalahan, silahkan coba lagi",
    });

    if (result) {
      router.push("/dashboard");
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="doctorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Doctor</FormLabel>
              <Select
                onValueChange={(value) => {
                  if (!session) {
                    setShowSignInDialog(true);
                    form.reset();
                    return;
                  }
                  field.onChange(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a doctor">
                      {field.value &&
                        doctors.find((doctor) => doctor.id === field.value)
                          ?.user.profile?.fullname}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full">
                  <ScrollArea className="h-44">
                    {doctors.map((doctor) => (
                      <SelectItem
                        className="cursor-pointer w-full"
                        key={doctor.id}
                        value={doctor.id}
                      >
                        <div className="my-3 flex items-center gap-4">
                          <Avatar>
                            <AvatarImage
                              src={
                                doctor.user.profile?.profileUrl ??
                                `https://api.dicebear.com/7.x/initials/svg?seed=${doctor.user.profile?.fullname}`
                              }
                            />
                            <AvatarFallback>
                              {doctor.user.profile?.fullname
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex items-end w-full gap-4">
                            <div className="">
                              <h3 className="text-base font-semibold">
                                {doctor.user.profile?.fullname}
                              </h3>
                              <div className="flex w-full justify-between">
                                <h5 className="text-xs text-muted-foreground">
                                  {doctor.specialization.name}
                                </h5>
                                <Separator
                                  orientation="vertical"
                                  className="mx-3  h-5"
                                />
                                <h5 className="text-xs text-muted-foreground">
                                  {doctor.hospital.name}
                                </h5>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {doctor.hospital.address.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                    <ScrollBar orientation="vertical" />
                  </ScrollArea>
                </SelectContent>
              </Select>
              <div>
                {form.getValues("doctorId") && (
                  <Button type="button" variant={"link"} className="space-x-2 " onClick={() => setShowDetails(true)} >
                    <p>Find out about {doctors.find((doctor) => doctor.id === form.getValues("doctorId"))?.user.profile?.fullname}</p>
                    <UserSearch className="size-4"/>
                  </Button>
                )}
                <FormDescription>
                  Choose the doctor for your appointment
                </FormDescription>
              </div>
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
                    onSelect={(value) => {
                      if (!session) {
                        setShowSignInDialog(true);
                        form.reset();
                        return;
                      }
                      field.onChange(value);
                    }}
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
              <Select
                onValueChange={(value) => {
                  if (!session) {
                    setShowSignInDialog(true);
                    form.reset();
                    return;
                  }
                  field.onChange(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent >
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
        <div className="flex justify-end">
          <Button
            variant={"blue"}
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
