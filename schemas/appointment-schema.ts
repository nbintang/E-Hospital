import * as z from "zod";

const AppointmentSchema = z.object({
  doctorId: z.string().min(1, "Please select a doctor"),
  date: z.date({
    required_error: "Please select a date",
  }),
  complaint: z.string().min(10, "Please enter your complaint"),
  time: z.string().min(1, "Please select a time"),
});
export default AppointmentSchema;

export type AppointmentValues = z.infer<typeof AppointmentSchema>;
