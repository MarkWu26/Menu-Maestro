
import { useDispatch, useSelector } from "react-redux";
import { setOptions } from "@/features/slice/optionSlice";

export const useOptions = () => {
  const dispatch = useDispatch();

  const optionItems = useSelector((state: any) => state.options.options);

  const setMenuOptions = (options: any) => {
    dispatch(setOptions(options));
  };

  return {
    optionItems,
    setMenuOptions,
  };
};
