import { useDispatch, useSelector } from "react-redux";
import { setMenuItems } from "@/features/slice/menuItemsSlice";
import { item } from "@/types";

export const useMenuItems = () => {
  const dispatch = useDispatch();
  const menuItems: item[] = useSelector((state: any) => state.menuItems.menuItems) 

  const setItems = (items: item[]) => {
    dispatch(setMenuItems(items))
  }

  return {
    setItems,
    menuItems
  };
};
