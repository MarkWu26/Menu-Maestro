import Heading from "../Heading";
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { Input } from "@/components/ui/input";

interface NameStepProps{
    register: UseFormRegister<FieldValues> ;
}

const NameStep: React.FC<NameStepProps> = ({
    register
}) => {
    return ( 
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
 
export default NameStep;