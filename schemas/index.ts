import * as z from "zod";

export const BookingFormSchema = z
  .object({
    name: z.string().min(1, { message: "Please enter your name." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    confirmEmail: z.string().email({ message: "Please confirm your email." }),
    phone: z
      .string()
      .min(11, { message: "Please enter a valid phone number." }),
    message: z.string().optional(),
    services: z.string().min(1, { message: "Select a service" }),
    date: z.date({ required_error: "A date of booking is required." }),
    time: z.string().min(1, { message: "Select a time" }),
  })
  .superRefine((data, context) => {
    if (data.email !== data.confirmEmail) {
      context.addIssue({
        code: "custom",
        path: ["confirmEmail"],
        message: "Emails must match.",
      });
    }
  });
