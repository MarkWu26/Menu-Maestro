import { useMenuItems } from "@/hooks/useMenuItems";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import {memo} from 'react'

interface HeaderProps {
  openAddModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ openAddModal }) => {

  console.log('HEADER')

  const { menuItems } = useMenuItems();

  return (
    <div className="flex flex-row justify-between w-full items-center">
      <div className="font-bold text-slate-800 text-2xl">Menu</div>
      {menuItems.length > 0 && (
        <div>
          <Button
            className="px-6 text-base font-semibold flex flex-row gap-x-2 items-center"
            size={"lg"}
            onClick={openAddModal}
          >
            <Plus size={18} /> Add Menu
          </Button>
        </div>
      )}
    </div>
  );
};

export default memo(Header);
