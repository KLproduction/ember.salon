import React from "react";
import { formatPrice } from "./formatPrice";

export const SERVICES = [
  {
    name: " Cut and Blow Dry",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsam adipisicing elit. Est ipsam psum dolor sit amet consectetur adipisicing elit.",
    image: "/cutting.png",
    path: "/",
    price: {
      cutting: [
        {
          name: "Cut & Styling",
          price: formatPrice(19),
        },
        {
          name: "Cleanse, Styling & Blow Dry Straight",
          price: formatPrice(14),
        },
        {
          name: "Cleanse & Up-do",
          price: formatPrice(30),
        },
        {
          name: "Child (Under 12)",
          price: formatPrice(14),
        },
      ],
    },
  },
  {
    name: " Treatment",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsam adipisicing elit. Est ipsam psum dolor sit amet consectetur adipisicing elit.",
    image: "/treatments.png",
    path: "/",
    price: {
      treatment: [
        {
          name: "Olaplex Protective Treatment",
          price: formatPrice(150),
        },
        {
          name: "Milbon Linkage Deep Intensive Care Treatment",
          price: formatPrice(160),
        },
        {
          name: "Milbon Superior Treatment",
          price: formatPrice(80),
        },
        {
          name: "Milbon Premium Position Treatment",
          price: formatPrice(100),
        },
      ],
    },
  },
  {
    name: " Coloring",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsam adipisicing elit. Est ipsam psum dolor sit amet consectetur adipisicing elit.",
    image: "/coloring.png",
    path: "/",
    price: {
      coloring: [
        {
          name: "Base Color or Color Treatment",
          price: formatPrice(50),
        },
        {
          name: "Protective Technical Bleach",
          price: formatPrice(40),
        },
        {
          name: "Creative Highlight",
          price: formatPrice(80),
        },
        {
          name: "Balayage / Air Touch",
          price: formatPrice(200),
        },
      ],
    },
  },
  {
    name: " Permanent",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsam adipisicing elit. Est ipsam psum dolor sit amet consectetur adipisicing elit.",
    image: "/permanent.png",
    path: "/",
    price: {
      permanent: [
        {
          name: "Touch Perm",
          price: formatPrice(40),
        },
        {
          name: "Technical Perm",
          price: formatPrice(80),
        },
      ],
    },
  },
];
