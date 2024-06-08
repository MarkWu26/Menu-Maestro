import Modal from "../../Modal";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import Heading from "../../Heading";
import { ref, set, push } from "firebase/database";
import { database } from "@/config/firebase";
import { toast } from "sonner";
import { useAddOptionModal } from "@/hooks/useAddOptionModal";
import { useOptions } from "@/hooks/useOptions";

const AddOptionModal = () => {
  const { handleCloseOptionModal, modalState } = useAddOptionModal();

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { optionItems } = useOptions();

  console.log("option items: ", optionItems);

  const { register, handleSubmit, watch, reset } = useForm<FieldValues>({
    defaultValues: {
      optionName: "",
    },
  });

  const optionName = watch("optionName");

  useEffect(() => {
    if (optionItems.some((option: string) => option.toLowerCase().trim() === optionName.toLowerCase().trim())) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [optionName, optionItems]);

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      await set(push(ref(database, "menuOptions")), {
        ...values,
      });
      handleCloseOptionModal();
      toast.success("Item added successfully!");
      reset();
    } catch (error) {
      console.log("error: ", error);
      toast.error("An error occured!");
    } finally {
      setIsLoading(false);
    }
  };

  const body = (
    <div className="flex flex-col gap-8">
      <Heading title="Add an option" subtitle="Add options to your dishes" />
      <Input
        id="optionName"
        className="py-6"
        placeholder="Option Name..."
        required
        {...register("optionName", { required: true })}
      />
    </div>
  );

  return (
    <Modal
      isOpen={modalState}
      onClose={handleCloseOptionModal}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
      disabled={isLoading || isDisabled}
      isLoading={isLoading}
      title="Add Menu Option"
      actionLabel="Save"
      secondaryActionLabel="Back"
      secondaryAction={handleCloseOptionModal}
    />
  );
};

export default AddOptionModal;
