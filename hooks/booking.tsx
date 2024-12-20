import { changeMessageIsRead, deleteMessage } from "@/action/message";
import { onLoadBooking } from "@/data/getBooking";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState, useEffect, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { de, enGB } from "date-fns/locale";
import { BookingFormSchema } from "@/schemas";
import { checkFreeTimeSlot } from "@/action/checkFreeTimeSlot";
import { addBooking } from "@/action/booking";
import { addAdminMessage } from "@/action/addAdminMessage";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useService } from "@/hooks/service";
import { z } from "zod";
import { BOOKINGLIMIT, TIMESLOTS } from "@/data/booking";
import { useInView } from "framer-motion";

export const useBookingMessage = (messageId: string | null) => {
  const query = useQueryClient();
  const { data, isFetching } = useQuery({
    queryKey: ["booking", messageId],
    queryFn: async () => {
      return await onLoadBooking();
    },
  });
  const readBooking = data?.booking?.filter(
    (item) => item.isMessageRead === true,
  );
  const unReadBooking = data?.booking?.filter(
    (item) => item.isMessageRead === false,
  );

  const { mutate: changeMessageStatusMutate } = useMutation({
    mutationFn: async (messageId: string) => {
      await changeMessageIsRead(messageId);
    },
    onSettled: () => {
      query.invalidateQueries({ queryKey: ["booking"], messageId });
    },
  });

  const onChangeMessageStatus = (messageId: string) => {
    changeMessageStatusMutate(messageId);
  };

  const { mutate: deleteMessageMutate } = useMutation({
    mutationFn: async (messageId: string) => {
      await deleteMessage(messageId);
    },
    onSettled: () => {
      query.invalidateQueries({ queryKey: ["booking"], messageId });
    },
  });

  const onDeleteMessage = (messageId: string) => {
    deleteMessageMutate(messageId);
  };

  const onViewMessage = (messageId: string) => {};

  return {
    readBooking,
    unReadBooking,
    onChangeMessageStatus,
    onDeleteMessage,
    isFetching,
    data,
  };
};

export const useBookingForm = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const isFormInView = useInView(formRef, { margin: "-100px" });
  const searchParams = useSearchParams();
  const serviceName = searchParams.get("service");
  const route = useRouter();
  const { data: service } = useService();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    watch,
    ...rest
  } = useForm<z.infer<typeof BookingFormSchema>>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      services: "",
      time: "",
      date: undefined,
    },
  });

  const selectedDate = watch("date");
  const selectedDateTrigger = selectedDate ? selectedDate.toISOString() : null;

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (searchParams) {
      setValue("services", serviceName || "");
    }
  }, [searchParams]);

  const { mutate: fetchAvailableSlots, isPending: isChecking } = useMutation({
    mutationFn: async (date: Date | null) => {
      if (!date) return [];
      const availableSlots: string[] = [];
      for (let slot of TIMESLOTS) {
        const count = await checkFreeTimeSlot(date, slot);
        if (count < BOOKINGLIMIT) {
          availableSlots.push(slot);
        }
      }
      return availableSlots;
    },
    onSuccess: (result) => {
      setAvailableTimeSlots(result);
      setValue("time", "");
    },
    onError: () => {
      console.log(errors);
    },
  });

  useEffect(() => {
    if (isFormInView) {
      fetchAvailableSlots(selectedDate || null);
    }
  }, [selectedDateTrigger]);

  const query = useQueryClient();
  const { mutate: onSubmitMutate, isPending: isSubmitting } = useMutation({
    mutationFn: async (values: z.infer<typeof BookingFormSchema>) => {
      return await addBooking(values);
    },
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["booking"] });
      reset();

      await addAdminMessage(data?.booking?.id!);
      route.push("/");
    },
    onSettled: (data) => {
      if (data?.status === 200) {
        toast.success(data.message);
      } else {
        toast.error(data?.message);
      }
    },
  });

  const onSubmit = handleSubmit((values) => {
    onSubmitMutate(values);
  });

  return {
    isChecking,
    isCalendarOpen,
    setIsCalendarOpen,
    availableTimeSlots,
    calendarRef,
    service,
    onSubmit,
    selectedDate,
    isSubmitting,
    fetchAvailableSlots,
    register,
    getValues,
    watch,
    setValue,
    errors,
    formRef,
    ...rest,
  };
};
