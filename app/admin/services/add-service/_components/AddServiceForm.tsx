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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { redirect, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useEffect, useState, useTransition } from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";

import UploadImage from "./UploadImage";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";

import { Weight } from "lucide-react";
import Link from "next/link";
import { ServiceAddingSchema } from "@/schemas";
import { addServiceToDB } from "@/action/addServiceToDB";
import { Category } from "@prisma/client";

type AddServiceFormProps = {
  category: Category[];
};

const AddServiceForm = ({ category }: AddServiceFormProps) => {
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const route = useRouter();

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
    console.log(form.getValues());
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-[300px] sm:w-[600px]">
        <CardHeader>Add Product</CardHeader>
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
                          <SelectTrigger className="w-[180px]">
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
                          <SelectTrigger className="w-[180px]">
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
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button asChild variant={"outline"}>
            <Link href={"/admin/services"}>Back</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddServiceForm;
