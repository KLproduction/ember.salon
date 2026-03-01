"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { ServiceAddingSchema } from "@/schemas";
import { addServiceToDB } from "@/action/addServiceToDB";
import { Category } from "@prisma/client";
import { useSession } from "next-auth/react";

type AddServiceFormProps = {
  category: Category[];
};

const AddServiceForm = ({ category }: AddServiceFormProps) => {
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const route = useRouter();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof ServiceAddingSchema>>({
    resolver: zodResolver(ServiceAddingSchema),
    defaultValues: {
      id: "",
      name: undefined,
      price: undefined,
      serviceStatus: undefined,
      categoryName: undefined,
      categoryId: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ServiceAddingSchema>) => {
    // Only allow this email
    const allowedEmail = "kent.law.production01@gmail.com";
    const userEmail = session?.user?.email;
    if (userEmail !== allowedEmail) {
      toast.error("Not authorized to do so");
      return;
    }
    try {
      startTransition(async () => {
        if (values) {
          const data = await addServiceToDB(values);
          if (data?.success === true) {
            toast.success(data.message);
            route.push("/admin/services");
          }

          if (data?.success !== true) {
            const errorMessage =
              data?.message ?? "An unexpected error occurred.";
            setError(errorMessage);
          }
        }
      });
    } catch (error) {
      setError("Failed to create product.");
      console.error("Update error:", error);
    }
  };

  return (
    <div className="flex w-full max-w-3xl flex-col items-center justify-center">
      <Card className="w-full rounded-[28px] border-amber-100 bg-white/95 shadow-[0_18px_60px_-30px_rgba(24,24,27,0.28)]">
        <CardHeader className="space-y-2 border-b border-zinc-100">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Add Service
          </h2>
          <p className="text-sm text-zinc-500">
            Create a new service entry for the admin catalog.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={"Enter product name"}
                          disabled={pending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={"Category"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="CUTTING">Cutting</SelectItem>
                              <SelectItem value="TREATMENT">
                                Treatment
                              </SelectItem>
                              <SelectItem value="COLORING">Coloring</SelectItem>
                              <SelectItem value="PERMANENT">
                                Permanent
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          disabled={pending}
                          onChange={(e) =>
                            field.onChange(
                              parseFloat(parseFloat(e.target.value).toFixed(2)),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="serviceStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={"Status"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Available">
                                Available
                              </SelectItem>
                              <SelectItem value="notAvailable">
                                Not Available
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-full rounded-2xl bg-zinc-900 text-white hover:bg-zinc-800"
                >
                  Save Service
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end border-t border-zinc-100">
          <Button
            asChild
            variant={"outline"}
            className="rounded-2xl border-zinc-200 bg-white"
          >
            <Link href={"/admin/services"}>Back</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddServiceForm;
