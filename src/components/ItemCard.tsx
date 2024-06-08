import { Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import burger from "@/assets/burger.jpg";
import {useDeleteModal} from "@/hooks/useDeleteModal";
import { item } from "@/types";
import { Button } from "./ui/button";
import {useEditModal} from "@/hooks/useEditModal";
import { useSelector } from "react-redux";
import {useViewModal} from "@/hooks/useViewModal";
import {useLoginModal} from "@/hooks/useLoginModal";

interface ItemCardProps {
  item?: item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const {handleOpenDeleteModal} = useDeleteModal();
  const {handleOpenEditModal} = useEditModal();
  const {setOpen: handleOpenLoginModal} = useLoginModal()
  const {handleOpenViewModal} = useViewModal()
  const user = useSelector((state: any) => state.user.user);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if(!user) {
      handleOpenLoginModal(true)
    } else {
      handleOpenDeleteModal(item)
    }
  }

  const handleEdit = (e: React.MouseEvent) => {
    console.log('hellooo')
    e.stopPropagation()
    if(!user){
      handleOpenLoginModal(true)
    } else {
      handleOpenEditModal(item)
    }
  }

  return (
    <Card
      className="group cursor-pointer dark:bg-[#1a1a1a] shadow-sm rounded-3xl"
      onClick={() => handleOpenViewModal(item)}
    >
      <CardHeader className="py-3" />
      <CardContent className="flex flex-col pb-2">
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
          <h4 className="scroll-m-20 text-lg font-bold tracking-tight text-orange-500">
            {item?.name}
          </h4>
        </div>
        <div className="font-bold text-base ">
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
              onClick={(e)=>handleEdit(e)}
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
