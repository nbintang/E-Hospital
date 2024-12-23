"use client";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import useOpenDoctorDetailsDialog from "@/hooks/dialog/use-open-doctor-details-dialog";
import DoctorDetails from "..";
import { DialogTitle } from "@/components/ui/dialog";
import { DoctorsProps } from "@/hooks/appointment/use-create-appointment";
export default function DoctorDetailsDialog({
  doctor,
}: {
  doctor: DoctorsProps| null;
}) {
  const { showDetails, setShowDetails } = useOpenDoctorDetailsDialog();

  if (!doctor) return null;
  return (
    <Drawer open={showDetails} onOpenChange={setShowDetails}>
      <DrawerContent>
        <DialogTitle className="hidden"></DialogTitle>
        <DoctorDetails doctor={doctor} />
      </DrawerContent>
    </Drawer>
  );
}
