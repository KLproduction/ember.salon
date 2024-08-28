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
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { currentUser } from "@/lib/auth";
import MySpinner from "@/components/MySpinner";
import { TService, TServiceItem } from "@/lib/type";
import { ServiceSettingSchema } from "@/schemas";
import { getProductByID } from "@/data/getProduct";
import { serviceSetting } from "@/action/serviceSetting";
import { deleteService } from "@/action/delete";

const ServiceDetailsPage = () => {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<TServiceItem | null>();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [formLoaded, setFormLoaded] = useState(false);
  const serviceId = searchParams.get("service");
  const [imageURL, setImageURL] = useState("");
  const route = useRouter();

  useEffect(() => {
    (async () => {
      if (serviceId) {
        const data = await getProductByID(serviceId);
        setProduct(data);
      }
    })();
  }, [serviceId]);

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        categoryName: product.categoryName,
        price: product.price,
        serviceStatus: product.serviceStatus,
      });
      setFormLoaded(true);
    }
  }, [product]);

  const form = useForm<z.infer<typeof ServiceSettingSchema>>({
    resolver: zodResolver(ServiceSettingSchema),
    defaultValues: {
      name: product?.name,
      categoryName: product?.categoryName,
      price: product?.price,
      serviceStatus: product?.serviceStatus,
    },
  });
  const onSubmit = (values: z.infer<typeof ServiceSettingSchema>) => {
    if (!serviceId) {
      console.log("No product ID found");
      return;
    }
    try {
      startTransition(async () => {
        setSuccess("");
        setError("");
        if (serviceId) {
          const response = await serviceSetting(serviceId, values);
          if (response?.success) {
            setSuccess("Update successful!");
            toast.success(response.success);
            route.refresh();
            redirect("/admin/services");
          } else {
            setError("Update failed");
            toast.error(response?.error);
          }
        }
      });
    } catch (error) {
      setError("Failed to update service settings.");
      console.error("Update error:", error);
    }
  };

  const deleteHandler = (productId: string) => {
    startTransition(async () => {
      setSuccess("");
      setError("");
      if (productId) {
        await deleteService(productId).then((data) => {
          if (data.success) {
            toast.success(data.message);
            route.push("/admin/services");
          }
          if (!data.success) {
            toast.error(data.message);
          }
        });
      }
    });
  };

  if (!formLoaded) return <MySpinner />;
  if (!product) {
    return <MySpinner />;
  }

  return (
    <Card className="w-[300px] text-zinc-600 sm:w-[600px]">
      <div className="flex justify-end p-5">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div>
              <Button variant={"destructive"}>Delete</Button>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove the
                data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteHandler(serviceId!)}
                className="bg-red-500"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <CardHeader className="text-xl font-bold">Service Setting</CardHeader>

      <CardContent>
        <div className="flex justify-end">
          <Label className="">Service ID: {product.id}</Label>
        </div>
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
                        placeholder={product.name}
                        disabled={isPending}
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
                          <SelectValue placeholder={product.categoryName} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="CUTTING">Cutting</SelectItem>
                            <SelectItem value="TREATMENT">Treatment</SelectItem>
                            <SelectItem value="COLORING">Coloring</SelectItem>
                            <SelectItem value="PERMANENT">Permanent</SelectItem>
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
                        disabled={isPending}
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
                          <SelectValue placeholder={product.serviceStatus} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Available">Available</SelectItem>
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

            <div className="flex justify-center">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end p-5">
        <Button asChild variant={"outline"}>
          <Link href={"/admin/services"}>Back</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceDetailsPage;
