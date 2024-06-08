import Heading from "../Heading";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { Input } from "../ui/input";
import { ItemOption } from "@/types";

interface QuantityStepProps {
  options: ItemOption[] | [];
  register: UseFormRegister<FieldValues>;
  quantity: number | null;
  updateOptionQuantity: (index: number, quantity: number) => void;
}

const QuantityStep: React.FC<QuantityStepProps> = ({
  options,
  register,
  quantity,
  updateOptionQuantity,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Please enter the quantity"
        subtitle="How many are there in stock?"
      />
      {options.length > 0 ? (
        <div className="flex flex-col gap-4 max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className="flex flex-row gap-x-4 pt-2 items-center justify-between"
            >
              <div className="">{option.name}</div>
              <div>Price: ₱{option.price}</div>
              <div className="flex items-center flex-row gap-x-2 w-[30%]">
                Quantity
                <Input
                  type="number"
                  id="quantity"
                  value={option.quantity || 0}
                  onChange={(e) =>
                    updateOptionQuantity(index, Number(e.target.value))
                  }
                  className="py-2 "
                />
              </div>
              <div className="flex items-center flex-row gap-x-2">
                Total cost: ₱{option.cost || 0}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <Input
            type="number"
            className="py-6"
            placeholder="Quantity..."
            id="quantity"
            required
            value={quantity || 0}
            {...register("quantity", { required: true })}
          />
        </div>
      )}
    </div>
  );
};

export default QuantityStep;
