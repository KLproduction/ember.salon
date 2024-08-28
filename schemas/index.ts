import { ServiceCategory, UserRole } from "@prisma/client";
import * as z from "zod";

export const ServiceSettingSchema = z.object({
  name: z.string().min(1, { message: "Please enter service name." }),
  price: z.number(),
  categoryName: z.enum(["CUTTING", "TREATMENT", "COLORING", "PERMANENT"]),
  serviceStatus: z.enum(["Available", "notAvailable"]),
});

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

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Minimum 8 Characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});
export const NewPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Minimum 8 Characters required",
  }),
});

export const SettingSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(8)),
    newPassword: z.optional(z.string().min(8)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required",
      path: ["newPassword"],
    },
  );
