import { useEditModal } from "@/hooks/useEditModal";
import Modal from "../../Modal";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { ItemOption } from "@/types";
import { toast } from "sonner";
import { ref, update } from "firebase/database";
import { database } from "@/config/firebase";

import ImageStep from "@/components/steps/ImageStep";
import CategoryStep from "@/components/steps/CategoryStep";
import NameStep from "@/components/steps/NameStep";
import OptionStep from "@/components/steps/OptionStep";
import QuantityStep from "@/components/steps/QuantityStep";

enum STEPS {
  CATEGORY = 0,
  NAME = 1,
  OPTIONS = 2,
  QUANTITY = 3,
  IMAGE = 4,
}

const EditModal = () => {
  const { handleCloseEditModal, modalState, selectedItem } = useEditModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isOptions, setIsOptions] = useState<boolean | null>(null);
  const [options, setOptions] = useState<ItemOption[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch, setValue, reset } =
    useForm<FieldValues>({
      defaultValues: {
        category: "",
        quantity: 0,
        name: "",
        price: 0,
        image: "",
        optionName: "",
        optionQuantity: 0,
      },
    });

  const category = watch("category");
  const image = watch("image");
  const optionName: string = watch("optionName");
  const optionPrice: number = watch("optionPrice");
  const quantity = watch("quantity");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  useEffect(() => {
    if (selectedItem) {
      // Update form values using selectedItem properties
      setValue("category", selectedItem.category || "");
      setValue("quantity", selectedItem.quantity || 0);
      setValue("name", selectedItem.name || "");
      setValue("price", selectedItem.price || 0);
      setValue("image", selectedItem.image || "");
      setValue("optionName", selectedItem.optionName || "");
      setValue("optionQuantity", selectedItem.optionQuantity || 0);
      if (selectedItem.options?.length === 0 || !selectedItem.options) {
        setIsOptions(false);
        setOptions([]);
      } else {
        setIsOptions(true);
        setOptions(selectedItem.options);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

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
        if (isOptions) {
          await update(ref(database, `/menuItems/${selectedItem?.id}`), {
            ...values,
            options,
          });
          handleCloseEditModal();
          toast.success("Item updated successfully!");
          setStep(STEPS.CATEGORY);
          reset();
          setIsOptions(null);
        } else {
          setIsLoading(true);
          await update(ref(database, `/menuItems/${selectedItem?.id}`), {
            ...values,
            optionName: null,
            optionQuantity: null,
          });
          handleCloseEditModal();
          toast.success("Item updated successfully!");
          setStep(STEPS.CATEGORY);
          reset();
          setIsOptions(null);
          console.log("SUCCESS!");
        }
      } catch (error) {
        console.log("error: ", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

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
      i === index
        ? { ...option, price, cost: Number(option?.quantity) * price }
        : option
    );
    setOptions(updatedOptions);
  };

  const updateOptionQuantity = (index: number, quantity: number) => {
    const updatedOptions = options.map((option, i) => {
      const cost = quantity * Number(option.price);
      return i === index ? { ...option, quantity, cost } : option;
    });
    setOptions(updatedOptions);
  };

  const handleSelectOption = (value: string) => {
    if (value === "No") {
      setIsOptions(false);
      setOptions([]);
    } else {
      setIsOptions(true);
    }
  };

  let body = (
    <CategoryStep
      register={register}
      setCustomValue={setCustomValue}
      category={category}
    />
  );

  if (step === STEPS.NAME) {
    body = <NameStep register={register} />;
  }

  if (step === STEPS.OPTIONS) {
    body = (
      <OptionStep
        isEdit
        register={register}
        isOptions={isOptions}
        setCustomValue={setCustomValue}
        optionName={optionName}
        options={options}
        handleSelectOption={handleSelectOption}
        addOption={addOption}
        updateOptionPrice={updateOptionPrice}
        removeOption={removeOption}
      />
    );
  }

  if (step === STEPS.QUANTITY) {
    body = (
      <QuantityStep
        options={options}
        register={register}
        quantity={quantity}
        updateOptionQuantity={updateOptionQuantity}
      />
    );
  }

  if (step === STEPS.IMAGE) {
    body = <ImageStep image={image} setCustomValue={setCustomValue} />;
  }

  return (
    <Modal
      title="Edit Menu Item"
      isOpen={modalState}
      onClose={handleCloseEditModal}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
      isLoading={isLoading}
      disabled={isLoading}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    />
  );
};

export default EditModal;
