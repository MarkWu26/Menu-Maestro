import {useEditModal} from "@/hooks/useEditModal";
import Modal from "../../Modal";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../../Heading";
import  Select  from "../../SelectInput";

import { Input } from "../../ui/input";
import ImageUpload from "../../ImageUpload";
import { Button } from "../../ui/button";
import { PlusIcon, Trash2 } from "lucide-react";
import { ItemOption } from "@/types";
import { toast } from "sonner";
import {ref, update } from "firebase/database";
import { database } from "@/config/firebase";
import { useOptions } from "@/hooks/useOptions";

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

const EditModal = () => {

    const {handleCloseEditModal, modalState, selectedItem} = useEditModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isOptions, setIsOptions] = useState<boolean | null>(null)
    const {optionItems} = useOptions();
    const [options, setOptions] = useState<ItemOption[] | []>([]);
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
      } = useForm<FieldValues>({
        defaultValues: {
          category: '',
          quantity: 0,
          name: '',
          price: 0,
          image: '',
          optionName: '',
          optionQuantity: 0
        },
      });

      const category = watch('category');
      const image = watch('image')
      const optionName: string = watch('optionName')
      const optionPrice: number = watch('optionPrice')
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
          setValue('category', selectedItem.category || '');
          setValue('quantity', selectedItem.quantity || 0);
          setValue('name', selectedItem.name || '');
          setValue('price', selectedItem.price || 0);
          setValue('image', selectedItem.image || '');
          setValue('optionName', selectedItem.optionName || '');
          setValue('optionQuantity', selectedItem.optionQuantity || 0);
          if(selectedItem.options?.length === 0 || !selectedItem.options){
            setIsOptions(false)
            setOptions([])
          } else {
            setIsOptions(true)
            setOptions(selectedItem.options)
          }
        
        }
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
              if(isOptions){
                await update(ref(database, `/menuItems/${selectedItem?.id}`), {...values, options});
                handleCloseEditModal();
                toast.success('Item updated successfully!')
                setStep(STEPS.CATEGORY)
                reset();
                setIsOptions(null)
              } else {
                setIsLoading(true)
                await update(ref(database, `/menuItems/${selectedItem?.id}`), {...values, optionName: null, optionQuantity: null});
                handleCloseEditModal();
                toast.success('Item updated successfully!')
                setStep(STEPS.CATEGORY)
                reset();
                setIsOptions(null)
                console.log('SUCCESS!')
              }
            
            } catch (error) {
              console.log('error: ', error)
            } finally {
              setIsLoading(false)
            }
          }
    }

    const addOption = () => { 
      if(optionName === '' || optionPrice === 0){
        return undefined
      }
      setOptions([...options, {name: optionName, price: optionPrice}]);
      setCustomValue('optionName', '')
      setCustomValue('optionPrice', 0)
    }
  
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
      });
      setOptions(updatedOptions);
    };
  
    const handleSelectOption = (value: string) => {
      if(value === 'No'){
        setIsOptions(false);
        setOptions([])
      } else {
        setIsOptions(true)
      }
    }

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
                    {...register("optionPrice")}
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
               <div className="flex-1">
                 {option.name}
               </div>
               <div className="flex-1">
                 ₱{option.price}
               </div>
               <div className="flex items-center gap-x-2 w-[30%]">
                 <span>Quantity</span>
                 <Input
                   type="number"
                   id={`quantity-${index}`}
                   value={option.quantity || 0}
                   onChange={(e) =>
                     updateOptionQuantity(index, Number(e.target.value))
                   }
                   className="py-2 w-full"
                 />
               </div>
               <div className="flex-1">
                 Cost: ₱{option.cost || 0}
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
}
 
export default EditModal;