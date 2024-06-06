import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "./ui/dropdown-menu";
import Avatar from "./Avatar";
import useSignupModal from "@/hooks/useSignupModal";
import useLoginModal from "@/hooks/useLoginModal";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from '@/config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { setUser } from "@/features/slice/userSlice";
import { toast } from "sonner";

const UserMenu = () => {

  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user.user);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user))
    })

    return () => {
      unsubscribe();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Account Logged out!');
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const signupModal = useSignupModal();
  const loginModal = useLoginModal();

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild className="z-[1006]">
          <div className="py-2 px-6 md:py-1 md:px-2 border-[1px] flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition z-[1006]">
            <Menu size={20} />
            <div className="hidden md:block">
              <Avatar src={""} />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[175px] font-semibold  shadow-md z-[1006]">

          {/*   <DropdownMenuLabel className="py-2">Welcome,</DropdownMenuLabel>
            <DropdownMenuSeparator /> */}
            {user ? (
              <>
              <DropdownMenuLabel className="py-2">Welcome, {user.displayName}! </DropdownMenuLabel>
            <DropdownMenuSeparator />
               <DropdownMenuItem
              className="py-2 cursor-pointer"
              onClick={logout}
            >
              Logout
            </DropdownMenuItem>
              </>
            ) : (
              <>
                 <DropdownMenuItem
              className="py-2 cursor-pointer"
              onClick={()=>loginModal.setOpen(true)}
            >
              Login
            </DropdownMenuItem>
            <DropdownMenuItem
              className="py-2 cursor-pointer"
              onClick={() => signupModal.setOpen(true)}
            >
              Signup
            </DropdownMenuItem>
              </>
            )}
    
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserMenu;
