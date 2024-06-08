import { useEffect, useState } from "react";
import Modal from "../../Modal";
import { useViewModal } from "@/hooks/useViewModal";
import { ItemOption } from "@/types";

const ViewModal = () => {
  const viewModal = useViewModal();

  const { selectedItem, modalState } = viewModal;

  const [selectedOption, setSelectedOption] = useState<ItemOption | undefined>(
    selectedItem?.options?.[0]
  );

  useEffect(() => {
    if (selectedItem && selectedItem.options) {
      setSelectedOption(selectedItem?.options?.[0]);
    }

    return () => {
      setSelectedOption(undefined);
    };
  }, [selectedItem]);

  const handleSelectOption = (option: any) => {
    const selectOption = selectedItem?.options?.find(
      (item) => item.name === option
    );
    setSelectedOption(selectOption);
  };

  const body = (
    <div className=" flex flex-col gap-4">
      <div className="text-2xl font-bold">{selectedItem?.name}</div>
      <div className="relative">
        <img
          src={selectedItem?.image || ""}
          className="rounded-xl overflow-hidden aspect-square h-[32vh] sm:h-[35vh] object-cover w-full"
        />
      </div>
      <div className="pt-2 flex flex-col gap-y-2 text-base">
        <div className="font-semibold flex flex-row gap-x-2 ">
          <span className="font-normal">Category:</span>{" "}
          {selectedItem?.category}
        </div>
        {selectedItem &&
        selectedItem.options &&
        selectedItem.options.length > 0 ? (
          <>
            <div className="font-semibold flex flex-row gap-x-2">
              Select an option:
            </div>
            <div className="flex flex-row gap-x-2">
              {selectedItem.options.map((option, index) => (
                <div
                  className={`${
                    selectedOption?.name === option.name
                      ? "bg-neutral-300"
                      : "bg-neutral-100 hover:bg-neutral-200"
                  }  px-4 py-2 rounded-lg hover:cursor-pointer transition-all duration-200 ease-in-out`}
                  key={index}
                  onClick={() => handleSelectOption(option.name)}
                >
                  {option.name}
                </div>
              ))}
            </div>
            <div className="font-semibold ">
              <span className="font-normal">Items in stock:</span>{" "}
              {selectedOption?.quantity} pcs.
            </div>
            <div className="font-semibold ">
              <span className="font-normal">Price: ₱</span>
              {selectedOption?.price}
            </div>
            <div className="font-semibold ">
              <span className="font-normal">Total cost: ₱</span>
              {selectedOption?.cost}
            </div>
          </>
        ) : (
          <>
            <div className="font-semibold flex flex-row gap-x-2">
              <span className="font-normal">Items in Stock</span>{" "}
              {selectedItem?.quantity} pcs.
            </div>
            <div className="font-semibold flex flex-row gap-x-2">
              <span className="font-normal">Price per item</span>₱
              {selectedItem?.price}
            </div>
            <div className="font-semibold flex flex-row gap-x-2">
              <span className="font-normal">Total Cost</span> ₱
              {selectedItem?.cost}
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={modalState}
      onClose={viewModal.handleCloseViewModal}
      onSubmit={viewModal.handleCloseViewModal}
      body={body}
      title="View Item"
      actionLabel="Close"
      isViewModal
    />
  );
};

export default ViewModal;
