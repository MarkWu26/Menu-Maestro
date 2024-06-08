import { UtensilsCrossed } from "lucide-react";
import Container from "./Container";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className="fixed w-full z-[30] bg-white overflow-hidden shadow-sm">
      <div className="py-3 border-b-[1px]">
        <Container>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-x-2 font-bold text-orange-400 text-lg items-center hover:cursor-pointer">
              <div className="bg-orange-400 text-white px-[6px] py-[6px] rounded-full">
              <UtensilsCrossed />
              </div>
              Menu Maestro
            </div>
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
