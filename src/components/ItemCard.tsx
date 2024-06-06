import { Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import burger from "@/assets/burger.jpg";
import useDeleteModal from "@/hooks/useDeleteModal";
import { item } from "@/types";
import { Button } from "./ui/button";
import useEditModal from "@/hooks/useEditModal";
import { useSelector } from "react-redux";
import useViewModal from "@/hooks/useViewModal";
import useLoginModal from "@/hooks/useLoginModal";

interface ItemCardProps {
  item?: item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const deleteModal = useDeleteModal();
  const editModal = useEditModal();
  const loginModal = useLoginModal()
  const viewModal = useViewModal()
  const user = useSelector((state: any) => state.user.user);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if(!user) {
      loginModal.setOpen(true)
    } else {
      deleteModal.setOpen(true, item?.id)
    }
  }

  return (
    <Card
      className="group cursor-pointer dark:bg-[#1a1a1a] shadow-sm rounded-2xl"
      onClick={() => viewModal.setOpen(true, item)}
    >
      <CardHeader className="py-3" />
      <CardContent className="flex flex-col">
        <div className=" w-full relative overflow-hidden rounded-md shadow-sm dark:shadow-2xl">
          <div
            className="absolute px-2 py-2 right-2 top-2 bg-red-500 rounded-full z-[20] hover:opacity-85"
            onClick={(e) => {
              handleDelete(e)
            }}
          >
            <Trash2 className="text-white" size={23} />
          </div>
          <img
            className="
              object-cover
              h-[30vh]
              overflow-hidden
              aspect-square
              w-full
              group-hover:scale-110
              transition
              shadow-lg
            "
            src={item?.image || burger}
            alt="item pic"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-y-2 items-start">
        <div>
          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
            {item?.name}
          </h4>
        </div>
        <div className="font-semibold">
          ₱
          {item?.options && item.options.length > 0 ? (
            <span>{item.options[0].price}</span>
          ) : (
            <span>{item?.price}</span>
          )}
        </div>
        {user && (
          <div className="pt-4 w-full z-[60]">
            <Button
              className="w-full py-5 z-[60]"
              onClick={(e)=>{
                e.stopPropagation()
                editModal.setOpen(true, item)
              }}
            >
              Edit
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
