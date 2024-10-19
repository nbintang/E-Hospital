import { ContentLayout } from "@/components/admin/admin-panel/content-layout";
import AppointmentCalendar from "@/components/appointment-calendar";

export default function AppointmentPage() {
  return (
    <ContentLayout  title="Appointments">
      <AppointmentCalendar />
    </ContentLayout>
  );
}

const appointments = [
  {
    id: "1",
    userId: "user1",
    doctorId: "doctor1",
    hospitalId: "hospital1",
    dateTime: new Date(2023, 9, 15, 10, 0),
    status: "PENDING" as "PENDING",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    userId: "user2",
    doctorId: "doctor2",
    hospitalId: "hospital1",
    dateTime: new Date(2023, 9, 15, 14, 30),
    status: "CONFIRMED" as "CONFIRMED",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    userId: "user3",
    doctorId: "doctor1",
    hospitalId: "hospital2",
    dateTime: new Date(2023, 9, 16, 11, 0),
    status: "CANCELLED" as "CANCELLED",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
