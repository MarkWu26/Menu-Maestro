"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectProps {
  items?: string[];
  defaultPlaceholder: string;
  onChange: (value: string) => void;
  selectedValue?: string;
}

const SelectInput: React.FC<SelectProps> = ({
  items,
  defaultPlaceholder = "select",
  onChange,
  selectedValue,
}) => {
  return (
    <Select
      value={selectedValue === "" || !selectedValue ? "" : selectedValue}
      onValueChange={(value) => onChange(value)}
    >
      <SelectTrigger className="w-full p-6 px-4 z-[1009]">
        <SelectValue placeholder={defaultPlaceholder} />
      </SelectTrigger>
      <SelectContent className="z-[1009]">
        <SelectGroup className="z-[1009]">
          {items?.map((item) => (
            <SelectItem
              onClick={() => {
                onChange(item);
              }}
              value={item}
              key={item}
              className="p-4 z-[1050]"
            >
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectInput;
