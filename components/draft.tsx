{
  /* <div>
                    <select
                      {...register("services")}
                      className="w-full rounded-xl border bg-transparent p-2"
                    >
                      <option value="" disabled className="bg-transparent">
                        Select a service
                      </option>
                      {service?.map((item, index) => (
                        <optgroup
                          label={item.name}
                          key={index}
                          className="font-bold text-orange-500"
                        >
                          {item.serviceItem.map((serviceItem, subIndex) => (
                            <option
                              key={subIndex}
                              value={serviceItem.name}
                              className="text-zinc-900"
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
                  </div> */
}

{
  /* Time Slot Selection */
}
// <div>
//   <select
//     {...register("time")}
//     className="w-full rounded-xl border bg-transparent p-2"
//     disabled={isSubmitting}
//   >
//     <option value="" disabled>
//       Select a Time Slot
//     </option>
//     {TIMESLOT.map((hour, index) => {
//       const slotTime = parseInt(hour.split(":")[0], 10);
//       const currentTime = new Date();
//       const currentHour = currentTime.getHours();
//       const isToday =
//         selectedDate &&
//         currentTime.toDateString() ===
//           new Date(selectedDate).toDateString();

//       return (
//         <option
//           key={index}
//           value={hour}
//           className="text-zinc-800 disabled:text-zinc-500"
//           disabled={
//             (slotTime <= currentHour + 1 && isToday) ||
//             !availableTimeSlots.includes(hour)
//           }
//         >
//           {hour}
//         </option>
//       );
//     })}
//   </select>
//   {errors.time && (
//     <div className="mt-2">
//       <FormError message={errors.time.message} />
//     </div>
//   )}
// </div>
