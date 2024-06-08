interface CategoryFilterProps {
  handleSetFilter: (item: string) => void;
  filter: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  handleSetFilter,
  filter,
}) => {
  const categories = [
    "All",
    "Appetizers",
    "Soups & Salads",
    "Main Courses",
    "Sides",
    "Desserts",
    "Beverages",
  ];

  return (
    <div className="flex gap-x-6 ">
      {categories.map((item, index) => (
        <div
          className={`flex flex-col rounded-xl items-center justify-center px-10 py-[0px] sm:p-4 sm:px-8 bg-white shadow-lg hover:cursor-pointer font-bold text-center ${
            filter === item
              ? "bg-green-100 border-[1px] border-green-400"
              : "hover:bg-green-50"
          } transition ease-in-out duration-200`}
          key={index}
          onClick={() => handleSetFilter(item)}
        >
          <span className="flex flex-row"> {item}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
