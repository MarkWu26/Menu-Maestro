interface AvatarProps {
  src?: string | null | undefined;
}

import placeholderImage from "@/assets/placeholder.jpg";

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <img
      src={src || placeholderImage}
      alt="avatar picture"
      className="rounded-full object-fill w-7 h-7"
    />
  );
};

export default Avatar;
