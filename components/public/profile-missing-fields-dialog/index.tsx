"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import useOpenWarnIncompleteProfile from "@/hooks/dialog/use-open-warn-incomplete-profile";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
export default function ProfileMissingFieldsDialog() {
  const { showWarn, setShowWarn } = useOpenWarnIncompleteProfile();
  return (
    <AlertDialog open={showWarn} onOpenChange={setShowWarn}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Please fill your profile information first!
          </AlertDialogTitle>
          <AlertDialogDescription>
            To ensure a secure data exchange, please complete your profile
            information.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="button" variant={"blue"} asChild>
            <Link href="/account">Complete Profile</Link>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
