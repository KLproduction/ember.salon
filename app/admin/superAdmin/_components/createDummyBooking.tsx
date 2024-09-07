import { z } from "zod";
import { BookingFormSchema } from "@/schemas";
import { format, addDays, isWithinInterval } from "date-fns";
import { faker } from "@faker-js/faker";
import { getServiceItem } from "@/data/getProduct";
import { addBooking } from "@/action/booking";

export const createDummyBooking = () => {
  const generateRandomDate = () => {
    const today = new Date();
    const maxDate = addDays(today, 30);
    const randomDate = new Date(
      today.getTime() + Math.random() * (maxDate.getTime() - today.getTime()),
    );
    return new Date(format(randomDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
  };

  const generateRandomTimeSlot = () => {
    const slots = [
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
    ];
    const randomSlot = slots[Math.floor(Math.random() * slots.length)];
    return randomSlot;
  };

  // Directly creating and returning the booking object here
  const name = faker.person.firstName();
  const email = faker.internet.email();
  const phone = "01234154789";
  const message = faker.lorem.sentences(2);
  const date = generateRandomDate();
  const time = generateRandomTimeSlot();

  const servicesArray = [
    "Cut and Styling",
    "Cleanse, Styling and Blow Dry Straight",
    "Cleanse and Up-do",
    "Olaplex Protective Treatment",
    "Milbon Linkage Deep Intensive Care Treatment",
    "Milbon Superior Treatment",
    "Milbon Premium Position Treatment",
    "Base Color or Color Treatment",
    "Protective Technical Bleach",
    "Creative Highlight",
    "Balayage / Air Touch",
    "Touch Perm",
    "Technical Perm",
  ];

  const getRandomService = () => {
    const randomIndex = Math.floor(Math.random() * servicesArray.length);
    return servicesArray[randomIndex];
  };

  const services = getRandomService();
  const booking = {
    name,
    email,
    phone,
    message,
    services,
    date,
    time,
  };

  return booking;
};
