"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageCropper } from "@/components/extensions/image-cropper";
import useSignUp from "@/hooks/auth/use-signup";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useMemo, useState } from "react";
import { LoaderCircleIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { cn } from "../../../lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export default function SignUpForm() {
  const {
    form,
    onSubmit,
    selectedFile,
    setSelectedFile,
    isDialogCropOpen,
    setIsDialogCropOpen,
    addressName,
    getRootProps,
    getInputProps,
    location,
    isAddressLoading,
    setCroppedImage,
    handleLocationChange,
  } = useSignUp();

  const [open, setOpen] = useState(false);
  const MapInput = useMemo(
    () =>
      dynamic(() => import("@/components/extensions/map-input"), {
        ssr: false,
      }),
    []
  );
const handleOpenDialogButton = async () => {
  const triggerValidate = await form.trigger();
  if (triggerValidate) {
    setOpen(true);
  } else {
    toast.error("Please fill in all the required fields.");
  }
}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="space-y-8 col-span-1">
            <div>
              <div className="mb-3">
              <Label className="">Profile Picture (Optional)</Label>
              </div>
              <div className="flex justify-center md:justify-start">
                {selectedFile ? (
                  <ImageCropper
                    dialogOpen={isDialogCropOpen}
                    setDialogOpen={setIsDialogCropOpen}
                    selectedFile={selectedFile}
                    setCroppedImage={setCroppedImage}
                    setSelectedFile={setSelectedFile}
                  />
                ) : (
                  <Avatar
                    {...getRootProps()}
                    className="size-24 md:size-36 cursor-pointer ring-offset-2 ring-2 ring-slate-200"
                  >
                    <input {...getInputProps()} />
                    <AvatarImage src={"/img/no-image.jpg"} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}
              </div>
              <p className="text-muted-foreground text-sm mt-3">
                Upload your profile picture for a personalized experience{" "}
              </p>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="z-20">
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)} // Explicitly pass the value
                    value={field.value || ""} // Fallback to an empty string if undefined
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-8 col-span-1">
            <div>
              <div className="my-2">
                <Label className="text-primary">Choose your Location</Label>
                <p className="text-muted-foreground text-sm">
                  Select your current location, Lorem ipsum dolor sit amet
                  consectetur, adipisicing elit. Quod, repellat nesciunt?
                </p>
              </div>
              <div className="h-96 w-full rounded-lg overflow-hidden ">
                <MapInput
                  location={location}
                  onLocationChange={handleLocationChange}
                />
              </div>
              {/* Display the selected address here */}
              <div className="mt-4 ">
                <h2 className="text-base  font-medium">Selected Address:</h2>
                <div className={cn("text-muted-foreground text-sm max-w-[300px] md:max-w-[400px] ")}>
                  {!isAddressLoading ? (
                    addressName || "No address selected"
                  ) : (
                    <div className="space-y-2">
                      <Skeleton className="h-4 " />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="termAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Accept terms and conditions</FormLabel>
                    <FormDescription>
                      I agree to the terms and conditions of the website
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            className="mt-6 px-9 w-full md:w-auto  flex items-center gap-x-3"
            type="button"
            variant={"blue"}
            onClick={handleOpenDialogButton}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <LoaderCircleIcon className="size-4 animate-spin" />
                <p>Submitting</p>
              </>
            ) : (
              <p>Submit</p>
            )}
          </Button>
        </div>
      </form>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, eum sit.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
          className="bg-clean-pool text-white hover:bg-soft-clean-pool"
              onClick={() => {
                setOpen(false); // Close the dialog
                form.handleSubmit(onSubmit)(); // Call the submit function
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
}
