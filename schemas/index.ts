import * as z from "zod";

export const BookingFormSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter your name.",
  }),
  email: z.string().email({
    message: "Please enter email.",
  }),
  phone: z.string().min(11, {
    message: "Please enter valid phone number.",
  }),
  message: z.string().optional(),
  services: z.string().min(1, { message: "Select a service" }),
  date: z.date({
    required_error: "A date of booking is required.",
  }),
  time: z.string().min(1, { message: "Select a service" }),
});
