"use client";
import useOpenAuthDialog from "@/hooks/dialog/use-open-auth-dialog";
import { createAppointments } from "@/repositories/appointments.repository";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useOpenDoctorDetailsDialog from "@/hooks/dialog/use-open-doctor-details-dialog";
import validateUserProfile from "@/helper/server/validate-user-profile";
import useOpenWarnIncompleteProfile from "@/hooks/dialog/use-open-warn-incomplete-profile";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AppointmentSchema, {
  AppointmentValues,
} from "@/schemas/appointment-schema";
import { Prisma } from "@prisma/client";
import { Session } from "next-auth";

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
}>;

export interface AppointmentFormProps {
  doctors: DoctorsProps[];
  session: Session | null;
}

export default function useCreateAppointment({
  doctors,
  session,
}: AppointmentFormProps) {
  const { setShowDetails } = useOpenDoctorDetailsDialog();
  const { setShowWarn } = useOpenWarnIncompleteProfile();
  const router = useRouter();
  const { setShowSignIn: setShowSignInDialog } = useOpenAuthDialog();
  const form = useForm<AppointmentValues>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      doctorId: "",
      complaint: "",
      date: new Date(),
      time: "",
    },
  });
  useEffect(() => {
    if (!session) {
      setShowSignInDialog(true);
      form.reset();
    }
  }, [session, setShowSignInDialog]);

  async function onFormSubmit(values: AppointmentValues) {
    if (!session) {
      setShowSignInDialog(true);
      form.reset();
      return;
    }
    const userId = session.user.id;
    const isValidProfileUser = await validateUserProfile(userId);
    if (!isValidProfileUser) {
      setShowWarn(true);
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
      complaint: values.complaint,
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

  return {
    form,
    onFormSubmit,
    setShowDetails,
  };
}
