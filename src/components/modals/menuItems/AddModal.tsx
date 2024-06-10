import { useAddModal } from "@/hooks/useAddModal";
import Modal from "../../Modal";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ref, set, push } from "firebase/database";
import { database } from "@/config/firebase";
import { toast } from "sonner";
import { ItemOption } from "@/types";
import CategoryStep from "@/components/steps/CategoryStep";
import NameStep from "@/components/steps/NameStep";
import OptionStep from "@/components/steps/OptionStep";
import QuantityStep from "@/components/steps/QuantityStep";
import ImageStep from "@/components/steps/ImageStep";
import useCheckInputs from "@/hooks/useCheckInputs";

enum STEPS {
  CATEGORY = 0,
  NAME = 1,
  OPTIONS = 2,
  QUANTITY = 3,
  IMAGE = 4,
}

const AddModal = () => {
  const { handleCloseAddModal, modalState } = useAddModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isOptions, setIsOptions] = useState<boolean | null>(null);
  const [options, setOptions] = useState<ItemOption[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const { register, handleSubmit, watch, setValue, reset } =
    useForm<FieldValues>({
      defaultValues: {
        category: null,
        quantity: 0,
        name: "",
        price: 0,
        image: "",
        optionName: "",
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

  useCheckInputs({
    step,
    category,
    name,
    price,
    isOptions,
    options,
    quantity,
    setIsDisabled,
  })

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
          handleCloseAddModal();
          setOptions([]);
        } else {
          await set(push(ref(database, "menuItems")), {
            ...values,
            cost: values.price * values.quantity,
            optionPrice: null,
            optionName: null,
            optionQuantity: null,
          });
          handleCloseAddModal();
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
      i === index ? { ...option, price, cost: Number(option?.quantity) * price } : option
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
    setCustomValue("isOptions", value);
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
      isOpen={modalState}
      onClose={handleCloseAddModal}
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
