import React from "react";
import Heading from "./Heading";
import { Button } from "./ui/button";
import {useAddModal} from "@/hooks/useAddModal";

interface emptyHeadingProps {
  title: string;
  subtitle?: string | undefined;
  isEmptyItems?: boolean;
}

const EmptyHeading: React.FC<emptyHeadingProps> = ({
  title,
  subtitle,
  isEmptyItems,
}) => {
  const {handleOpenAddModal} = useAddModal();

  return (
    <div className="flex flex-col gap-2 justify-center items-center h-[50vh]">
      <Heading title={title} center subtitle={subtitle} />
      {isEmptyItems && (
        <div className="p-4">
          <Button
            className="text-lg py-6"
            size="lg"
            onClick={handleOpenAddModal}
          >
            Add Menu Item
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyHeading;
