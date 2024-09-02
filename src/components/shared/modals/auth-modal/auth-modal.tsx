"use client";

import { Button, Dialog, DialogContent } from "@/components/ui";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { SignInForm } from "./forms/sign-in-form";
import { SignUpForm } from "./forms/sign-up-form";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = useState<"signin" | "signup">("signin");

  const onSwitchType = () => {
    setType(type === "signin" ? "signup" : "signin");
  };

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        {type === "signin" ? (
          <SignInForm onClose={handleClose} />
        ) : (
          <SignUpForm />
        )}

        <hr />
        <div className="flex gap-2">
          <Button
            className="gap-2 h-12 p-2 flex-1"
            variant="secondary"
            type="button"
            onClick={() =>
              signIn("github", {
                callbackUrl: "/",
                redirect: true,
              })
            }
          >
            <img
              className="w-6 h-6"
              src="https://github.githubassets.com/favicons/favicon.svg"
            />
            GitHib
          </Button>

          <Button
            className="gap-2 h-12 p-2 flex-1"
            variant="secondary"
            type="button"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
                redirect: true,
              })
            }
          >
            <img
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            />
            Google
          </Button>
        </div>
        <Button
          className="h-12"
          variant="outline"
          type="button"
          onClick={onSwitchType}
        >
          {type !== "signin" ? "Sign in" : "Sign up"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
