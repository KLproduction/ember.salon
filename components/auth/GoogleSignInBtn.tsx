"use client";
import { googleSignIn } from "@/action/GoogleSignIn";
import { Button } from "../ui/button";

const GoogleSignInBtn = () => {
  return (
    <div>
      <Button onClick={() => googleSignIn()} variant={"ghost"} size={"sm"}>
        Google Sign In
      </Button>
    </div>
  );
};

export default GoogleSignInBtn;
