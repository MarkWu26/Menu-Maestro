import { ItemOption } from "@/types";
import { useEffect } from "react"

interface useCheckInputsProps {
    step: number;
    category: string | null;
    name: string;
    price: number;
    isOptions: boolean | null;
    options: ItemOption[] | [];
    quantity: number;
    setIsDisabled: (value: boolean) => void;
  }

enum STEPS {
    CATEGORY = 0,
    NAME = 1,
    OPTIONS = 2,
    QUANTITY = 3,
    IMAGE = 4,
}

const useCheckInputs = ({step, category, name, price, isOptions, quantity, setIsDisabled, options} : useCheckInputsProps) => {
    useEffect(() => {
        const checkInputs = () => {
          if (step === STEPS.CATEGORY && !category) {
            setIsDisabled(true);
            return;
          }

          if (step === STEPS.NAME && name === "") {
            setIsDisabled(true);
            return;
          }

          if (step === STEPS.OPTIONS) {
            if (!isOptions && Number(price) === 0) {
              setIsDisabled(true);
              return;
            }
            
            if (isOptions && options.length === 0) {
              setIsDisabled(true);
              return;
            }
          }

          if (step === STEPS.QUANTITY) {
            if (isOptions && options.some(option => Number(option.quantity) === 0 || !option.quantity)) {
              setIsDisabled(true);
              return;
            }
            if (!isOptions && Number(quantity) === 0) {
              setIsDisabled(true);
              return;
            }
          }
          setIsDisabled(false);
        };
    
        checkInputs();
      }, [category, step, name, price, isOptions, options, quantity, setIsDisabled]);
}

export default useCheckInputs