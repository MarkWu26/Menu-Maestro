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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import {FcGoogle} from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Input } from "../../ui/input";
import { toast } from "sonner";
import {useLoginModal} from "@/hooks/useLoginModal";
import {useSignupModal} from "@/hooks/useSignupModal";

const LoginModal = () => {

  const {setOpen, isOpen, setClose} = useLoginModal();
  const {setOpen: setSignupModalOpen} = useSignupModal();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FieldValues>({});

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
        toast.success('Logged in!')
        setClose();
        reset();
      } catch (error) {
        console.error(error);
        toast.error('Error!')
      }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success('Logged in!')
      setClose();
      reset();
    } catch (error) {
      console.log('error: ', error)
      toast.error(error as string)
    } 
  }

  const openSignupModal = () => {
    setClose();
    setSignupModalOpen(true)
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="pt-6 pb-2">
          <DialogTitle className="text-2xl flex font-semibold justify-center items-center">
            Login to your account!
          </DialogTitle>
          <DialogDescription className="flex items-center justify-center text-md">
            Enter your details below to login.
          </DialogDescription>
        </DialogHeader>
        <div className="gap-8 flex flex-col">
          <div className="flex flex-col gap-4">
            <span> Email</span>
            <Input
              className="py-6"
              placeholder="Email..."
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
          <Button className="py-6 text-base" onClick={handleSubmit(onSubmit)}>Login</Button>
          <Button onClick={googleSignIn} className="py-6 text-base gap-x-2 flex " variant="outline">
            <FcGoogle/> Sign in with Google
          </Button>
        </div>
        <DialogFooter className="flex flex-col gap-y-2 pb-6 items-center">
          <div className="flex flex-col pt-6 gap-y-4 items-center justify-center w-full">
            <p className="px-8 flex items-center gap-x-2 justify-center text-center text-muted-foreground">
              Don't have an account yet?
              <span
                className="cursor-pointer hover:border-b"
                onClick={openSignupModal}
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

export default LoginModal;
