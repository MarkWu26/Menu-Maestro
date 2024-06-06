
import Modal from "../../Modal";

import useViewModal from "@/hooks/useViewModal";

const ViewModal = () => {
  const viewModal = useViewModal();

  const { item } = viewModal;

  const body = (
    <div className=" flex flex-col gap-4">
      <div className="text-2xl font-bold">
        {item?.name} 
      </div>
      <div className="relative">
        <img src={item?.image || ''} className="rounded-xl overflow-hidden aspect-square h-[40vh] object-cover w-full"/>
      </div>
      <div className="py-2 flex flex-col gap-y-2 text-base">
      <div className="font-semibold flex flex-row gap-x-2 ">
      <span className="font-normal">Category</span>  {item?.category}
      </div>
      <div className="font-semibold flex flex-row gap-x-2">
      <span className="font-normal">Items in Stock</span>  {item?.quantity} pieces
      </div>
      <div className="font-semibold flex flex-row gap-x-2">
      <span className="font-normal">Price per item</span> ₱ {item?.price}
      </div>
      <div className="font-semibold flex flex-row gap-x-2">
      <span className="font-normal">Total Cost</span> ₱ {item?.cost}
      </div>
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
