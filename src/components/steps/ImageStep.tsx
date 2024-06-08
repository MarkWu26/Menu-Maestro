import Heading from "../Heading";
import ImageUpload from "../ImageUpload";

interface ImageStepProps{
    image: string;
    setCustomValue: (id: string, value: string) => void;
}

const ImageStep: React.FC<ImageStepProps> = ({
    image,
    setCustomValue
}) => {
  return (
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
};

export default ImageStep;
