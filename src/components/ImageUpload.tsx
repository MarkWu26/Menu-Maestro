/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";

interface ImageUploadProps {
  onChange: (value: string) => void;
  image: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, image }) => {
  const [isClose, setIsClose] = useState(false);

  useEffect(() => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dcb9b0kjl",
        uploadPreset: "twymtwgd",
        maxFiles: 1,
      }, // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err: any, result: any) => {
        if (!err && result && result.event === "success") {
          console.log("done here is the image info: ", result.info);
          onChange(result.info.url);
          setIsClose(true);
        }
      }
    );

    if (isClose) {
      widget.destroy();
    }

    document.getElementById("upload_widget")?.addEventListener(
      "click",
      () => {
        widget.open();
        setIsClose(false);
      },
      false
    );

    return () => {
      document
        .getElementById("upload_widget")
        ?.removeEventListener("click", () => {
          widget.open();
        });
    };
  }, [onChange, isClose]);

  return (
    <>
      {image === "" ? (
        <div
          id="upload_widget"
          className="
        relative
        cursor-pointer
        border-dashed transition hover:opacity-70
        h-[300px]
        rounded-md
        border-2
        p-20
      border-neutral-300
        flex
        flex-col
        justify-center
        items-center
        gap-4 text-neutral-600
        "
        >
          {/* <TbPhotoPlus size={50} /> */}
          <div className="font-semibold text-lg">Click to upload</div>
          <ImagePlus size={50} />
        </div>
      ) : (
        <div className="relative cursor-pointer rounded-lg h-[300px]">
          <img
            src={image}
            alt="itemImage"
            className="aspect-square rounded-lg overflow-hidden object-cover h-[300px] w-full"
          />
        </div>
      )}
    </>
  );
};

export default ImageUpload;
