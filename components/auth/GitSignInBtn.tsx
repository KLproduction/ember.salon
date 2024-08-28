"use client";
import { gitSignIn } from "@/action/socalSignInAction";
import { Button } from "../ui/button";

const GitSignInBtn = () => {
  return (
    <div>
      <Button onClick={() => gitSignIn()} variant={"ghost"} size={"sm"}>
        GitHub Sign In
      </Button>
    </div>
  );
};

export default GitSignInBtn;
