import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import Avatar from "./Avatar";
import { useSignupModal } from "@/hooks/useSignupModal";
import { useLoginModal } from "@/hooks/useLoginModal";
import { useEffect } from "react";
import { auth } from "@/config/firebase";
import { onAuthStateChanged, signOut, reload } from "firebase/auth";
import { toast } from "sonner";
import { serializeUser } from "@/lib/serializeUser";
import { useAddModal } from "@/hooks/useAddModal";
import { useAddOptionModal } from "@/hooks/useAddOptionModal";
import { useUser } from "@/hooks/useUser";

const UserMenu = () => {

  const { setOpen: setOpenSignupModal } = useSignupModal();
  const { setOpen: setOpenLoginModal } = useLoginModal();
  const { handleOpenOptionModal } = useAddOptionModal();
  const {setCurrentUser, user} = useUser();
  const { handleOpenAddModal } = useAddModal();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        reload(user)
          .then(() => {
            setCurrentUser(serializeUser(user));
          })
          .catch((error) => {
            console.error("Failed to reload user:", error);
          });
      } else {
        setCurrentUser(null)
      }
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Account Logged out!");
    } catch (error) {
      console.log("error: ", error);
    }
  };

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
          {user ? (
            <>
              <DropdownMenuLabel className="py-2">
                Welcome, {user.displayName}!{" "}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="py-2 cursor-pointer"
                onClick={handleOpenAddModal}
              >
                Add Menu Item
              </DropdownMenuItem>
              <DropdownMenuItem
                className="py-2 cursor-pointer"
                onClick={handleOpenOptionModal}
              >
                Add Menu Option
              </DropdownMenuItem>
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
                onClick={() => setOpenLoginModal(true)}
              >
                Login
              </DropdownMenuItem>
              <DropdownMenuItem
                className="py-2 cursor-pointer"
                onClick={() => setOpenSignupModal(true)}
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
