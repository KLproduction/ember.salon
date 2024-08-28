"use server";

import { signOutAction } from "@/action/signOut";
import { Button } from "../ui/button";
import { CgLogOut } from "react-icons/cg";

export const signOutonClickHandler = async () => {
  await signOutAction();
};
