"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useSignupModal from "@/hooks/useSignupModal";
import { Input } from "../../ui/input";
import { toast } from "sonner";
import useLoginModal from "@/hooks/useLoginModal";

const SignupModal = () => {

  const signupModal = useSignupModal();
  const loginModal = useLoginModal()

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      type: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast.success('Account created!')
      signupModal.setClose();
      reset();
    } catch (error) {
      console.log('error: ', error)
      toast.error(error as string)
    }
  }

  const openLoginModal = () => {
    signupModal.setClose()
    loginModal.setOpen(true);
  };

  return (
    <Dialog open={signupModal.isOpen} onOpenChange={signupModal.setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="pt-6 pb-2">
          <DialogTitle className="text-2xl flex font-semibold justify-center items-center">
            Create an account!
          </DialogTitle>
          <DialogDescription className="flex items-center justify-center text-md">
            Enter your details below to start continuing.
          </DialogDescription>
        </DialogHeader>
        {/* <UserAuthForm type={userType} isPawnshop={isPawnshop}/> */}
        <div className="gap-8 flex flex-col">
          <div className="flex flex-col gap-4">
            <span> Email</span>
            <Input
              className="py-6"
              placeholder="Name..."
              {...register("email", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-4">
            <span>Password</span>
            <Input
              className="py-6"
              placeholder="Password..."
              type="password"
              {...register("password", { required: true })}
            />
          </div>
          <Button className="py-6 text-base" onClick={handleSubmit(onSubmit)}>Sign Up</Button>
        </div>
        <DialogFooter className="flex flex-col gap-y-2 pb-6 items-center">
          <div className="flex flex-col pt-6 gap-y-4 items-center justify-center w-full">
            <p className="px-8 flex items-center gap-x-2 justify-center text-center text-muted-foreground">
              Already have an account?
              <span
                className="cursor-pointer hover:border-b"
                onClick={openLoginModal}
              >
                Click here.
              </span>
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
