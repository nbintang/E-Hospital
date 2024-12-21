"use client"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,} from "@/components/ui/dialog"
import useOpenDoctorDetailsDialog from "@/hooks/dialog/use-open-doctor-details-dialog";
export default function DoctorDetailsDialog() {
    const {showDetails, setShowDetails} = useOpenDoctorDetailsDialog()
    return (
        <Dialog  open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
}