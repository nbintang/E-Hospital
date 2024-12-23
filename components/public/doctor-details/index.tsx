
import { MapPin, Phone, Mail, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DoctorsProps } from "@/hooks/appointment/use-create-appointment";

export default function DoctorDetails({ doctor }: { doctor: DoctorsProps }) {
  return (
    <div className="container px-4 py-8">
      <Card className="w-full  border-none">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={doctor.user.profile?.profileUrl || "/placeholder.svg"}
              alt={doctor.user.profile?.fullname}
            />
            <AvatarFallback>
              {doctor.user.profile?.fullname?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl font-bold">
              {doctor.user.profile?.fullname}
            </CardTitle>
            <CardDescription>{doctor.specialization.name}</CardDescription>
            <Badge variant="secondary" className="mt-2">
              {doctor.hospital.name}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="text-muted-foreground" />
              <span>{doctor.hospital.address.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="text-muted-foreground" />
              <span>{doctor.user.profile?.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="text-muted-foreground" />
              <span>{doctor.user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="text-muted-foreground" />
              <span>Joined {doctor.createdAt.toLocaleDateString()}</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-muted-foreground">
              Dr. {doctor.user.profile?.fullname} is a highly skilled{" "}
              {doctor.specialization.name} specialist at {doctor.hospital.name}.
              With years of experience in the field, they are dedicated to
              providing exceptional patient care and staying at the forefront of
              medical advancements.
            </p>
          </div>
        </CardContent>
       
      </Card>
    </div>
  );
}
