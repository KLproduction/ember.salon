import { z } from "zod";
import { BookingFormSchema } from "@/schemas";
import { format, addDays, isWithinInterval } from "date-fns";
import { faker } from "@faker-js/faker";
import { getServiceItem } from "@/data/getProduct";

export const createDummyBooking = () => {
  const generateRandomDate = () => {
    const today = new Date();
    const maxDate = addDays(today, 180);
    const randomDate = new Date(
      today.getTime() + Math.random() * (maxDate.getTime() - today.getTime()),
    );
    return randomDate;
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

  const generateDummyBooking = async () => {
    const name = faker.person.firstName();
    const email = faker.internet.email();
    const phone = "01234-154-789";
    const message = faker.lorem.sentences(2);
    const date = generateRandomDate();
    const time = generateRandomTimeSlot();

    const servicesArray = [
      "Cut and Styling",
      "Milbon Superior Treatment",
      "Technical Perm",
      "Base Color or Color Treatment",
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

  const generateDummyBookings = (count: number) => {
    const dummyBookings = [];
    for (let i = 0; i < count; i++) {
      dummyBookings.push(generateDummyBooking());
    }
    return dummyBookings;
  };

  const dummyBooking = generateDummyBooking();
  console.log("DUMMY ORDER", dummyBooking);
};
