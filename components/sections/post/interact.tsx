"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
interface InteractProps {
    handleActionClick: (action: "delete" | "publish") => void;
    dialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
    dialogAction: "delete" | "publish" | null;
    handleConfirm: () => void;
  }
export default function InteractPostDetail({
  handleActionClick,
  dialogOpen,
  setDialogOpen,
  dialogAction,
  handleConfirm,
}: InteractProps) {
 
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default"size={"icon"} className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
         
          <DropdownMenuItem onSelect={() => console.log("Edit clicked")}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className={"text-red-500"} onSelect={() => handleActionClick("delete")}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle >
              {dialogAction === "delete"
                ? "Confirm Deletion"
                : "Confirm Publication"}
            </DialogTitle>
            <DialogDescription>
              {dialogAction === "delete"
                ? "Are you sure you want to delete this item? This action cannot be undone."
                : "Are you sure you want to publish this item? It will be visible to all users."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} variant={dialogAction === "delete" ? "destructive" : "default"}>
              {dialogAction === "delete" ? "Delete" : "Publish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
