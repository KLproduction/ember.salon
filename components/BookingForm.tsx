"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";
import MySpinner from "./MySpinner";
import BookingFormLoader from "./BookingFormLoader";
import { useBookingForm } from "@/hooks/booking";
import { TIMESLOT } from "@/lib/serviceList";
import { Label } from "recharts";
import { enGB } from "date-fns/locale";
import { FormError } from "./form-error";
import { error } from "console";

const BookingForm = () => {
  const {
    isChecking,
    isCalendarOpen,
    setIsCalendarOpen,
    availableTimeSlots,
    calendarRef,
    service,
    onSubmit,
    selectedDate,
    isSubmitting,
    register,
    getValues,
    watch,
    setValue,
    errors,
    fetchAvailableSlots,
    formRef,
  } = useBookingForm();

  return (
    <div
      className="flex h-full w-full items-center justify-center"
      ref={formRef}
    >
      <div
        className="h-full w-screen bg-cover bg-fixed bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/formBG2.png")' }}
      >
        <div className="flex flex-col items-center justify-center">
          <Card className="mx-0 my-12 flex max-h-full flex-col items-center justify-center bg-black/90 text-zinc-50 backdrop-blur-sm sm:mx-8 md:mx-12 lg:mx-20 xl:mx-48">
            <CardHeader className="flex items-center justify-center px-4 text-4xl font-black text-orange-500 sm:px-8 md:px-12 lg:px-20 xl:px-48">
              BOOK ONLINE
              <CardDescription className="mt-10 max-w-[80%] font-semibold text-zinc-50">
                Choose your service, pick a convenient date and time, and let us
                take care of the rest.
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full max-w-[80%] px-4 text-xs sm:px-8 md:px-10 lg:px-20 xl:px-48">
              <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-5 text-zinc-50">
                  {/* Service Selection */}
                  <div>
                    <select
                      {...register("services")}
                      className="w-full rounded-2xl border bg-transparent p-2"
                    >
                      <option value="" disabled className="bg-transparent">
                        Select a service
                      </option>
                      {service?.map((item, index) => (
                        <optgroup
                          label={item.name}
                          key={index}
                          className="font-bold text-orange-700"
                        >
                          {item.serviceItem.map((serviceItem, subIndex) => (
                            <option
                              key={subIndex}
                              value={serviceItem.name}
                              className="text-xs text-zinc-900"
                            >
                              {serviceItem.name}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    {errors.services && (
                      <div className="mt-2">
                        <FormError message={errors.services.message} />
                      </div>
                    )}
                  </div>

                  {/* <div>
                    <Label>Service</Label>
                    <Select
                      onValueChange={(value) => {
                        setValue("services", value);
                      }}
                      value={getValues("services")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            getValues("services") || "Select a service"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {service?.map((item, index) => (
                          <div key={index}>
                            <SelectLabel>{item.name}</SelectLabel>
                            {item.serviceItem.map((serviceItem, subIndex) => (
                              <SelectItem
                                key={`${index}-${subIndex}`}
                                value={serviceItem.name}
                              >
                                {serviceItem.name}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </div> */}

                  {/* Date Selection */}
                  <div className="flex h-20 flex-col justify-end text-white">
                    <Label className="mb-2">Pick a date</Label>
                    <div className="relative">
                      <Button
                        className={`min-w-[250px] rounded-2xl border bg-transparent px-2 py-1 text-left font-normal ${
                          !getValues("date") ? "text-muted-foreground" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault(); // Prevent form submission when toggling calendar
                          setIsCalendarOpen((open) => !open);
                        }}
                      >
                        {getValues("date") ? (
                          format(getValues("date"), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto inline-block h-4 w-4 opacity-50" />
                      </Button>

                      {isCalendarOpen && (
                        <div
                          className="absolute top-full z-[50] mt-2 w-auto p-0"
                          ref={calendarRef}
                        >
                          <Calendar
                            mode="single"
                            selected={getValues("date") || new Date()}
                            onSelect={(date) => {
                              setValue("date", date ?? new Date());
                              fetchAvailableSlots(date!);
                              setIsCalendarOpen(false);
                              // If necessary to check slots or data after selection
                            }}
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);

                              const compareDate = new Date(date);
                              compareDate.setHours(0, 0, 0, 0);

                              return compareDate < today; // Disable past dates
                            }}
                            initialFocus
                            locale={enGB}
                            className="bg-zinc-100 text-zinc-900"
                            defaultMonth={selectedDate || new Date()}
                          />
                        </div>
                      )}
                    </div>
                    {/* Optional validation message */}
                    {errors && errors.date && (
                      <div>
                        <FormError message={errors.date?.message} />
                      </div>
                    )}
                  </div>

                  {/* Time Slot Selection */}
                  {/* <div>
                    <Label>Time Slot</Label>
                    <Select
                      onValueChange={(value) => setValue("time", value)}
                      value={getValues("time")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            getValues("time") || "Select a time slot"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {TIMESLOT.map((hour, index) => {
                          const slotTime = parseInt(hour.split(":")[0], 10);
                          const currentTime = new Date();
                          const currentHour = currentTime.getHours();
                          const isToday =
                            selectedDate &&
                            currentTime.toDateString() ===
                              new Date(selectedDate).toDateString();

                          return (
                            <SelectItem
                              key={index}
                              value={hour}
                              disabled={
                                (slotTime <= currentHour + 1 && isToday) ||
                                !availableTimeSlots.includes(hour)
                              }
                            >
                              {hour}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div> */}
                  <div>
                    <select
                      {...register("time")}
                      className="w-full rounded-2xl border bg-transparent p-2"
                      disabled={isSubmitting}
                    >
                      <option value="" disabled>
                        Select a Time Slot
                      </option>
                      {TIMESLOT.map((hour, index) => {
                        const slotTime = parseInt(hour.split(":")[0], 10);
                        const currentTime = new Date();
                        const currentHour = currentTime.getHours();
                        const isToday =
                          selectedDate &&
                          currentTime.toDateString() ===
                            new Date(selectedDate).toDateString();

                        return (
                          <option
                            key={index}
                            value={hour}
                            className="text-zinc-900 disabled:text-zinc-500"
                            disabled={
                              (slotTime <= currentHour + 1 && isToday) ||
                              !availableTimeSlots.includes(hour)
                            }
                          >
                            {hour}
                          </option>
                        );
                      })}
                    </select>
                    {errors && errors.time && (
                      <div>
                        <FormError message={errors.time?.message} />
                      </div>
                    )}
                  </div>

                  {/* Name Input */}
                  <div>
                    <Label className="block font-medium">Name</Label>
                    <Input
                      type="text"
                      {...register("name")}
                      className="w-full rounded border p-2 text-zinc-900"
                      placeholder={
                        errors.name?.message
                          ? errors.name.message
                          : "Please Enter Your Name"
                      }
                      disabled={isSubmitting}
                    />
                    {errors && errors.name && (
                      <div>
                        <FormError message={errors.name?.message} />
                      </div>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div>
                    <Label className="block font-medium">Phone Number</Label>
                    <Input
                      type="text"
                      {...register("phone")}
                      className="w-full rounded border p-2 text-zinc-900"
                      placeholder="Please Enter Your Phone Number"
                      disabled={isSubmitting}
                    />
                    {errors && errors.phone && (
                      <div>
                        <FormError message={errors.phone?.message} />
                      </div>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <Label className="block font-medium">Email</Label>
                    <Input
                      type="email"
                      {...register("email")}
                      className="w-full rounded border p-2 text-zinc-900"
                      placeholder="Please Enter Your Email"
                      disabled={isSubmitting}
                    />
                    {errors && errors.email && (
                      <div>
                        <FormError message={errors.email?.message} />
                      </div>
                    )}
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <Label className="block font-medium">Message</Label>
                    <Textarea
                      {...register("message")}
                      className="w-full resize-none rounded border p-2 text-zinc-50"
                      rows={6}
                      placeholder="Additional message"
                      disabled={isSubmitting}
                    />
                    {errors && errors.message && (
                      <div>
                        <FormError message={errors.message?.message} />
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  type="submit"
                  className="mt-4 w-full rounded bg-orange-500 p-5 text-xl text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "BOOK NOW"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      {isChecking && <BookingFormLoader />}
      {isSubmitting && <MySpinner />}
    </div>
  );
};

export default BookingForm;
// const BookingForm = () => {
//   const [isPending, startTransition] = useTransition();
//   const formRef = useRef<HTMLDivElement | null>(null);
//   const isFormInView = useInView(formRef);
//   const searchParams = useSearchParams();
//   const serviceName = searchParams.get("service");
//   const [IsChecking, setIsChecking] = useState(false);
//   const { data: service, isFetching } = useService();

//   useEffect(() => {
//     form.reset({
//       ...form.getValues(),
//       services: serviceName || "",
//     });
//   }, [serviceName, searchParams]);

//   const form = useForm<z.infer<typeof BookingFormSchema>>({
//     resolver: zodResolver(BookingFormSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       phone: "",
//       message: "",
//       services: "",
//       time: "",
//       date: new Date(),
//     },
//   });

//   const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
//   const [isCalendarOpen, setIsCalendarOpen] = useState(false);
//   const calendarRef = useRef<HTMLDivElement | null>(null);

//   const handleOutsideClick = (event: MouseEvent) => {
//     const target = event.target as Node;
//     if (calendarRef.current && !calendarRef.current.contains(target)) {
//       setIsCalendarOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleOutsideClick);
//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, []);

//   const slots = [
//     "10:00",
//     "11:00",
//     "12:00",
//     "13:00",
//     "14:00",
//     "15:00",
//     "16:00",
//     "17:00",
//     "18:00",
//     "19:00",
//   ];
//   const selectedDate = form.watch("date");
//   const selectedDateTrigger = selectedDate ? selectedDate.toISOString() : null;

//   useEffect(() => {
//     startTransition(async () => {
//       const availableSlots = [];
//       for (let slot of slots) {
//         const count = await checkFreeTimeSlot(selectedDate, slot);

//         if (count < 5) {
//           availableSlots.push(slot);
//         }
//       }
//       setAvailableTimeSlots(availableSlots);
//       form.reset({
//         ...form.getValues(),
//         time: "",
//       });
//       setIsChecking(false);
//     });
//   }, [selectedDateTrigger]);

//   const onSubmit = (values: z.infer<typeof BookingFormSchema>) => {
//     startTransition(async () => {
//       const data = await addBooking(values);
//       if (data.success) {
//         toast.success("Confirm email has been Sent.");
//         if (data.booking) {
//           await addAdminMessage(data.booking?.id);
//         }
//         form.reset({
//           ...form.getValues(),
//           name: "",
//           email: "",
//           phone: "",
//           message: "",
//           services: "",
//           time: "",
//           date: new Date(),
//         });
//       }
//     });
//   };

//   return (
//     <div
//       className="flex h-full w-full items-center justify-center"
//       ref={formRef}
//     >
//       <div
//         className="h-full w-full bg-fixed bg-center bg-no-repeat"
//         style={{ backgroundImage: 'url("/formBG2.png")' }}
//       >
//         <div className="flex flex-col items-center justify-center">
//           <Card className="mx-4 my-12 flex max-h-full flex-col items-center justify-center bg-black/90 text-zinc-50 backdrop-blur-sm sm:mx-8 md:mx-12 lg:mx-20 xl:mx-48">
//             <CardHeader className="flex items-center justify-center px-4 text-4xl font-black text-orange-500 sm:px-8 md:px-12 lg:px-20 xl:px-48">
//               BOOK ONLINE
//               <CardDescription className="mt-10 font-semibold text-zinc-50">
//                 Choose your service, pick a convenient date and time, and let us
//                 take care of the rest. Hassle-free booking for a premium salon
//                 experience.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="w-full px-4 text-4xl sm:px-8 md:px-10 lg:px-20 xl:px-48">
//               <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)}>
//                   <div className="flex flex-col gap-5">
//                     <FormField
//                       control={form.control}
//                       name="services"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Service</FormLabel>
//                           <Select
//                             onValueChange={field.onChange}
//                             value={field.value}
//                           >
//                             <FormControl>
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select a service" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               {service?.map((item, index) => (
//                                 <SelectGroup key={index}>
//                                   <SelectLabel className="border-b-2 border-zinc-700 text-yellow-600">
//                                     {item.name}
//                                   </SelectLabel>

//                                   {item.serviceItem.map((item, index) => (
//                                     <SelectItem value={item.name} key={index}>
//                                       {item.name}
//                                     </SelectItem>
//                                   ))}
//                                 </SelectGroup>
//                               ))}
//                             </SelectContent>
//                           </Select>

//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="date"
//                       render={({ field }) => (
//                         <FormItem className="flex h-20 flex-col justify-end text-white">
//                           <FormLabel>Pick a date</FormLabel>
//                           <div className="relative">
//                             <Button
//                               variant="outline"
//                               className={`min-w-[250px] bg-transparent text-left font-normal ${
//                                 !field.value ? "text-muted-foreground" : ""
//                               }`}
//                               onClick={() => {
//                                 setIsCalendarOpen((open) => !open);
//                               }}
//                               type="button"
//                             >
//                               {field.value ? (
//                                 format(field.value, "PPP")
//                               ) : (
//                                 <span>Pick a date</span>
//                               )}
//                               <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                             </Button>
//                             {isCalendarOpen && (
//                               <div
//                                 className="absolute top-full mt-2 w-auto p-0"
//                                 ref={calendarRef}
//                               >
//                                 <Calendar
//                                   mode="single"
//                                   selected={
//                                     field.value ? field.value : new Date()
//                                   }
//                                   onSelect={(date) => {
//                                     field.onChange(date);
//                                     setIsCalendarOpen(false);
//                                     setIsChecking(true);
//                                   }}
//                                   disabled={(date) => {
//                                     const today = new Date();
//                                     today.setHours(0, 0, 0, 0);

//                                     const compareDate = new Date(date);
//                                     compareDate.setHours(0, 0, 0, 0);

//                                     return compareDate < today;
//                                   }}
//                                   initialFocus
//                                   locale={enGB}
//                                   className="z-[50] bg-zinc-100 text-zinc-900"
//                                   defaultMonth={
//                                     selectedDate ? selectedDate : new Date()
//                                   }
//                                 />
//                               </div>
//                             )}
//                           </div>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="time"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Time Slot</FormLabel>
//                           <Select
//                             onValueChange={field.onChange}
//                             value={field.value}
//                             disabled={isPending}
//                           >
//                             <FormControl>
//                               <SelectTrigger className="disabled:bg-zinc-600 disabled:text-zinc-600">
//                                 <SelectValue
//                                   placeholder={"Select a Time Slot"}
//                                 />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               {slots.map((hour, index) => {
//                                 const slotTime = parseInt(
//                                   hour.split(":")[0],
//                                   10,
//                                 );

//                                 const currentTime = new Date();
//                                 const currentHour = currentTime.getHours();
//                                 const isToday =
//                                   selectedDate &&
//                                   currentTime.toDateString() ===
//                                     new Date(selectedDate).toDateString();

//                                 return (
//                                   <SelectItem
//                                     key={index}
//                                     value={hour}
//                                     disabled={
//                                       (slotTime <= currentHour + 1 &&
//                                         isToday) ||
//                                       !availableTimeSlots.includes(hour)
//                                     }
//                                   >
//                                     {hour}
//                                   </SelectItem>
//                                 );
//                               })}
//                             </SelectContent>
//                           </Select>

//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2">
//                       <FormField
//                         control={form.control}
//                         name="name"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Name:</FormLabel>
//                             <FormControl>
//                               <Input
//                                 {...field}
//                                 placeholder="Please Enter Your Name"
//                                 disabled={isPending}
//                                 className="min-w-[250px]"
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="phone"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Phone Number:</FormLabel>
//                             <FormControl>
//                               <Input
//                                 {...field}
//                                 placeholder="Please Enter Your Phone Number"
//                                 disabled={isPending}
//                                 className="min-w-[250px] placeholder-red-300"
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="email"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Email:</FormLabel>
//                             <FormControl>
//                               <Input
//                                 {...field}
//                                 placeholder="Please Enter Your Email"
//                                 disabled={isPending}
//                                 className="min-w-[250px]"
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                     <FormField
//                       control={form.control}
//                       name="message"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Message:</FormLabel>
//                           <FormControl>
//                             <Textarea
//                               {...field}
//                               placeholder="Additional message"
//                               disabled={isPending}
//                               className="min-w-[250px] resize-none"
//                               rows={6}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                   <div className="mt-10 flex items-center justify-center">
//                     <Button
//                       type="submit"
//                       className="w-full border-white bg-transparent p-5 text-xl text-white ring-1 ring-white hover:bg-yellow-700"
//                     >
//                       BOOK NOW
//                     </Button>
//                   </div>
//                 </form>
//               </Form>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//       {IsChecking && isFormInView && (
//         <div>
//           <BookingFormLoader />
//         </div>
//       )}
//       {isPending && isFormInView && !IsChecking && (
//         <div>
//           <MySpinner />
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingForm;
