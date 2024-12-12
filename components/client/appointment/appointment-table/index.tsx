
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import moment from 'moment'
import { AppointmentProps } from ".."

interface AppointmentListProps {
  appointments: AppointmentProps[]
}

export default function AppointmentList({ appointments }: AppointmentListProps) {
  return (
    <Table>
      <TableCaption>A list of your appointments</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Doctor</TableHead>
          <TableHead>Specialization</TableHead>
          <TableHead>Hospital</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>{appointment.doctor.user.profile?.fullname}</TableCell>
            <TableCell>{appointment.doctor.specialization.name}</TableCell>
            <TableCell>{appointment.hospital.name}</TableCell>
            <TableCell>{moment(new Date(appointment.dateTime)).format("MMMM Do YYYY")}</TableCell>
            <TableCell>
              <Badge variant={appointment.status === 'CONFIRMED' ? 'default' : appointment.status === 'PENDING' ? 'secondary' : 'destructive'}>
                {appointment.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

