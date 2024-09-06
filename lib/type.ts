import {
  $Enums,
  ServiceCategory,
  ServiceItem,
  ServiceStatus,
} from "@prisma/client";

export type TService = {
  id: string;
  name: string;
  description: string;
  image: string;
  serviceItem: TServiceItem[];
};

export type TServiceItem = {
  id: string;
  name: string;
  price: number;
  serviceStatus: $Enums.ServiceStatus;
  categoryName: $Enums.ServiceCategory;
};

export type TBookingChart = {
  name: string;
  booking: number;
  date: number;
};
