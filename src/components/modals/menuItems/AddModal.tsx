import useMenuModal from "@/hooks/useAddModal";
import Modal from "../../Modal";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { Input } from "../../ui/input";
import Select from "../../SelectInput";
import Heading from "../../Heading";
import ImageUpload from "@/components/ImageUpload";
import { Button } from "../../ui/button";
import { PlusIcon, Trash2 } from "lucide-react";
import { ref, set, push } from "firebase/database";
import { database } from "@/config/firebase";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { ItemOption } from "@/types";

enum STEPS {
  CATEGORY = 0,
  NAME = 1,
  OPTIONS = 2,
  QUANTITY = 3,
  IMAGE = 4,
}

const categories = [
  "Appetizers",
  "Soups & Salads",
  "Main Courses",
  "Sides",
  "Desserts",
  "Beverages",
];

const AddModal = () => {
  const menuModal = useMenuModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isOptions, setIsOptions] = useState<boolean | null>(null);
  const [options, setOptions] = useState<ItemOption[] | []
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const optionItems = useSelector((state: any) => {
    console.log('state: ', state)
    return state.options.options
  })

  const { register, handleSubmit, watch, setValue, reset } =
    useForm<FieldValues>({
      defaultValues: {
        category: null,
        quantity: 0,
        name: "",
        price: 0,
        image: "",
        optionName: "",
        isOptions: null,
        optionPrice: 0,
      },
    });

  const category = watch("category");
  const image = watch("image");
  const name = watch("name");
  const price = watch("price");
  const quantity = watch("quantity");
  const optionName: string = watch("optionName");
  const optionPrice: number = watch("optionPrice");
  const totalCost = watch('cost')

  console.log("totalCOst", totalCost);

  useEffect(() => {
    if (step === STEPS.CATEGORY && !category) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }

    if (step === STEPS.NAME && name === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }

    if (step === STEPS.OPTIONS) {
      if (!isOptions && Number(price) === 0) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }

      if (isOptions && options.length === 0) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }

    if (step === STEPS.QUANTITY) {
      if (
        isOptions &&
        options.some(
          (option) => Number(option.quantity) === 0 || !option.quantity
        )
      ) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }

      if (!isOptions && Number(quantity) === 0) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }
  }, [category, step, name, price, isOptions, options, quantity]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    if (step !== STEPS.IMAGE) {
      return onNext();
    } else {
      try {
        setIsLoading(true);
        if (isOptions) {
          await set(push(ref(database, "menuItems")), {
            ...values,
            quantity: null,
            price: null,
            optionName: null,
            optionPrice: null,
            optionQuantity: null,
            options,
          });
          menuModal.setClose();
          setOptions([]);
        } else {
          await set(push(ref(database, "menuItems")), {
            ...values,
            cost: values.price * values.quantity,
            optionName: null,
            optionQuantity: null,
          });
          menuModal.setClose();
        }
        toast.success("Item added successfully!");
        setStep(STEPS.CATEGORY);
        setIsOptions(null);
        reset();
      } catch (error) {
        console.log("error: ", error);
        toast.error("An error occured!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const actionLabel = useMemo(() => {
    if (step !== STEPS.IMAGE) {
      return "Continue";
    }

    return "Submit";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const addOption = () => {
    if (optionName === "" || optionPrice === 0) {
      return undefined;
    }
    setOptions([...options, { name: optionName, price: optionPrice }]);
    setCustomValue("optionName", "");
    setCustomValue("optionPrice", 0);
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const updateOptionPrice = (index: number, price: number) => {
    const updatedOptions = options.map((option, i) =>
      i === index ? { ...option, price } : option
    );
    setOptions(updatedOptions);
  };

  const updateOptionQuantity = (index: number, quantity: number) => {
    const updatedOptions = options.map((option, i) =>{
      const cost = quantity * Number(option.price)
     return  i === index ? { ...option, quantity, cost } : option
    }
     
    );
    setOptions(updatedOptions);
  };



  const handleSelectOption = (value: string) => {
    if (value === "No") {
      setIsOptions(false);
      setOptions([]);
    } else {
      setIsOptions(true);
    }
    setCustomValue("isOptions", value);
  };

  let body = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Please choose a category"
        subtitle=" Select a category from the dropdown below to proceed."
      />

      <Select
        defaultPlaceholder="Select Category..."
        {...register("category", { required: true })}
        items={categories}
        selectedValue={category}
        onChange={(value: string) => setCustomValue("category", value)}
      />
    </div>
  );

  if (step === STEPS.NAME) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Please enter item name"
          subtitle="Please provide a name for the menu item."
        />
        <Input
          className="py-6"
          placeholder="Name..."
          id="name"
          required
          {...register("name", { required: true })}
        />
        {/* Text Input */}
      </div>
    );
  }

  if (step === STEPS.OPTIONS) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add Options and Quantity"
          subtitle="Specify any options available for this item (e.g., sizes, add-ons)."
        />
        <div className="flex flex-col gap-y-2">
          Do you want to include options for the item?
          <Select
            defaultPlaceholder="Select Options..."
            {...register("isOptions", { required: true })}
            items={["No", "Yes"]}
            selectedValue={
              isOptions === null ? "" : isOptions === false ? "No" : "Yes"
            }
            onChange={(value: string) => handleSelectOption(value)}
          />
        </div>
        {isOptions ? (
          <div className="flex flex-col gap-y-2">
            Please select an option and price
            <div className="flex flex-row gap-x-4 items-center justify-between">
              <div className="flex flex-row items-center w-[50%]">
                {/*  <Input 
                className="py-6 w-full" 
                placeholder="Option Name" 
                id="optionName" 
                required  
                {...register("optionName",  {required: false} )}
              /> */}
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
                  {...register("optionPrice", { required: true })}
                />
              </div>
              <Button onClick={addOption}>
                <PlusIcon size={18} />
              </Button>
            </div>
            {options.length > 0 && (
              <h5 className="font-semibold">Item Options</h5>
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

  if (step === STEPS.QUANTITY) {
    body = (
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
                <div>
                  Price: ₱{option.price}
                </div>
                <div className="flex items-center flex-row gap-x-2">
                  Quantity
                  <Input
                    type="number"
                    id="quantity"
                    value={option.quantity || 0}
                    onChange={(e) =>
                      updateOptionQuantity(index, Number(e.target.value))
                    }
                    className="py-2"
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
              value={quantity}
              {...register('quantity', {required: true})}
              
            />
          </div>
        )}
      </div>
    );
  }

  if (step === STEPS.IMAGE) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Please upload photo"
          subtitle="Please provide a photo of the item."
        />
        <ImageUpload
          image={image}
          onChange={(value: string) => setCustomValue("image", value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={menuModal.isOpen}
      onClose={menuModal.setClose}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
      disabled={isLoading || isDisabled}
      isLoading={isLoading}
      title="Add Item"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    />
  );
};

export default AddModal;
