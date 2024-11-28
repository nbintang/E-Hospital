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
import MapInput from "@/components/extensions/map-input";
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
import { useState } from "react";

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
    setCroppedImage,
    handleLocationChange,
  } = useSignUp();

  const [open, setOpen] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-8 col-span-1">
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
              <h1 className="my-4">Choose your Location</h1>
              <div className="h-96 w-full rounded-lg overflow-hidden ">
                <MapInput
                  location={location}
                  onLocationChange={handleLocationChange}
                />
              </div>
              {/* Display the selected address here */}
              <div className="mt-4">
                <h2 className="text-lg font-semibold">Selected Address:</h2>
                <p>{addressName || "No address selected"}</p>
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
            className="mt-4"
            type="button"
            onClick={() => setOpen(true)} // Open the dialog
            disabled={form.formState.isSubmitting}
          >
            Register
          </Button>
        </div>
      </form>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
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
