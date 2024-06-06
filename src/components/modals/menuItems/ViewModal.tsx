import { useEffect, useState } from "react";
import Modal from "../../Modal";

import useViewModal from "@/hooks/useViewModal";
import { ItemOption } from "@/types";

const ViewModal = () => {
  const viewModal = useViewModal();

  const { item } = viewModal;

  console.log('item 1: ', item?.options?.[0])

  const [selectedOption, setSelectedOption] = useState<ItemOption | undefined>(item?.options?.[0]);

  useEffect(()=>{
    if(item && item.options){
      setSelectedOption(item?.options?.[0])
    }

    return () => {
      setSelectedOption(undefined)
    }
   
  }, [item])

  const handleSelectOption = (option: any) => {
    const selectOption = item?.options?.find((item) => item.name === option);
    setSelectedOption(selectOption)
  }

  console.log('seelcted option', selectedOption)

  const body = (
    <div className=" flex flex-col gap-4">
      <div className="text-2xl font-bold">{item?.name}</div>
      <div className="relative">
        <img
          src={item?.image || ""}
          className="rounded-xl overflow-hidden aspect-square h-[35vh] object-cover w-full"
        />
      </div>
      <div className="py-2 flex flex-col gap-y-2 text-base">
        <div className="font-semibold flex flex-row gap-x-2 ">
          <span className="font-normal">Category</span> {item?.category}
        </div>
        {item && item.options && item.options.length > 0 ? (
          <>
            <div className="font-semibold flex flex-row gap-x-2">
             Select an option
            </div>
            <div className="flex flex-row  gap-x-2">
            {item.options.map((option, index)=>(
              <div 
                className={`${selectedOption?.name === option.name ? 'bg-neutral-300' : 'bg-neutral-100'}  px-4 py-2 rounded-lg hover:cursor-pointer transition-all duration-200 ease-in-out` }
                key={index}
                onClick={()=>handleSelectOption(option.name)}
              >
                {option.name}
              </div>
            ))}
            </div>
            <div>
              Items in stock: {selectedOption?.quantity} pcs.
            </div>
            <div>
              Price: ₱{selectedOption?.price}
            </div>
            <div>
              Total cost: ₱{selectedOption?.cost}
            </div>
          
          </>
        ) : (
          <>
            <div className="font-semibold flex flex-row gap-x-2">
              <span className="font-normal">Items in Stock</span>{" "}
              {item?.quantity} pcs.
            </div>
            <div className="font-semibold flex flex-row gap-x-2">
              <span className="font-normal">Price per item</span> ₱{" "}
              {item?.price}
            </div>
            <div className="font-semibold flex flex-row gap-x-2">
              <span className="font-normal">Total Cost</span> ₱ {item?.cost}
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={viewModal.isOpen}
      onClose={viewModal.setClose}
      onSubmit={viewModal.setClose}
      body={body}
      /*  disabled={isLoading}
      isLoading={isLoading} */
      title="View Item"
      actionLabel="Close"
    />
  );
};

export default ViewModal;
