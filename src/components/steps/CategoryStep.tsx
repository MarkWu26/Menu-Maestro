import Heading from "../Heading";
import Select from "../SelectInput";
import categories from '@/lib/categories.json'
import { UseFormRegister, FieldValues } from 'react-hook-form';

interface CategoryStepProps {
    category: string | null;
    setCustomValue: (id: string, value: string) => void;
    register: UseFormRegister<FieldValues> ;
}

const CategoryStep: React.FC<CategoryStepProps> = ({
    category,
    setCustomValue,
    register
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Please choose a category"
        subtitle=" Select a category from the dropdown below to proceed."
      />
      <Select
        defaultPlaceholder="Select Category..."
        {...register("category", { required: true })}
        items={categories}
        selectedValue={category || ''}
        onChange={(value: string) => setCustomValue("category", value)}
      />
    </div>
  );
};

export default CategoryStep;
