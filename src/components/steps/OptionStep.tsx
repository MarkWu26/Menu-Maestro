import Heading from "../Heading";
import { UseFormRegister, FieldValues } from 'react-hook-form';
import Select from "../SelectInput";
import { Button } from "../ui/button";
import { PlusIcon, Trash2 } from "lucide-react";
import { Input } from "../ui/input";

import { useOptions } from "@/hooks/useOptions";
import { ItemOption } from "@/types";

interface OptionStepProps{
    register: UseFormRegister<FieldValues>;
    isOptions: boolean | null;
    setCustomValue: (id: string, value: string) => void;
    optionName: string;
    options: ItemOption[] | []
    handleSelectOption: (value: string) => void;
    addOption: () => void;
    updateOptionPrice: (index: number, price: number) => void;
    removeOption: (index: number) => void
    isEdit?: boolean
}

const OptionStep: React.FC<OptionStepProps> = ({
    register,
    isOptions,
    setCustomValue,
    optionName,
    options,
    handleSelectOption,
    addOption,
    updateOptionPrice,
    removeOption,
    isEdit = false
}) => {

    const {optionItems} = useOptions();

    return ( 
        <div className="flex flex-col gap-8">
        <Heading
          title="Add Options and Prices"
          subtitle="Specify any options available for this item (e.g., sizes, add-ons)."
        />

        <div className="flex flex-col gap-y-2">
          Do you want to include options for the item?
          {isEdit ? (
            <Select
            defaultPlaceholder="Select Options..."
            items={["No", "Yes"]}
            selectedValue={
              isOptions === null ? "" : isOptions === false ? "No" : "Yes"
            }
            onChange={(value: string) => handleSelectOption(value)}
          />
          ) : (
            <Select
            defaultPlaceholder="Select Options..."
            {...register("isOptions", { required: isEdit ? false : true })}
            items={["No", "Yes"]}
            selectedValue={
              isOptions === null ? "" : isOptions === false ? "No" : "Yes"
            }
            onChange={(value: string) => handleSelectOption(value)}
          />
          )}
        </div>

        {isOptions ? (
          <div className="flex flex-col gap-y-2">
            Please select an option and price
            <div className="flex flex-row gap-x-4 items-center justify-between">
              <div className="flex flex-row items-center w-[50%]">
                <Select
                  defaultPlaceholder="Select Option..."
                  items={optionItems || []}
                  selectedValue={optionName}
                  onChange={(value: string) =>
                    setCustomValue("optionName", value)
                  }
                />
              </div>
              <div className="flex flex-row gap-x-2 items-center w-[50%]">
                Price:  
                    <Input
                    type="number"
                    className="py-6"
                    placeholder="Price..."
                    id="optionPrice"
                    required
                    {...register("optionPrice", { required: isEdit ? false : true })}
                    />           
              </div>
              <Button onClick={addOption}>
                <PlusIcon size={18} />
              </Button>
            </div>
            {options.length > 0 && (
              <h5 className="font-semibold pt-4">Item Options</h5>
            )}
            <div className="flex flex-col gap-4 max-h-60 overflow-y-auto">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-x-4 pt-2 items-center justify-between"
                >
                  <div className="w-[30%]">{option.name}</div>
                  <div className="flex items-center flex-row gap-x-2">
                    Price:
                    <Input
                      type="number"
                      value={option.price}
                      onChange={(e) =>
                        updateOptionPrice(index, Number(e.target.value))
                      }
                      className="py-2"
                    />
                  </div>
                  <Button onClick={() => removeOption(index)}>
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          isOptions === false && (
            <div className="flex flex-col gap-y-2">
              How much does it cost?
              <Input
                type="number"
                className="py-6"
                placeholder="Price..."
                id="price"
                {...register('price', {required: true})}
                required  
              />
            </div>
          )
        )}
      </div>
     );
}
 
export default OptionStep;