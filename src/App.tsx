import "./App.css";
import Container from "./components/Container";
import ItemCard from "./components/ItemCard";
import Navbar from "./components/Navbar";
import { Button } from "./components/ui/button";
import { Plus } from "lucide-react";
import { useAddModal } from "./hooks/useAddModal";
import MenuModal from "./components/modals/menuItems/AddModal";
import { useEffect, useState } from "react";
import { database } from "@/config/firebase";
import { ref, onValue } from "firebase/database";
import EmptyHeading from "./components/EmptyHeading";
import SkeletonCard from "./components/SkeletonCard";
import { useDispatch, useSelector } from "react-redux";
import { useLoginModal } from "./hooks/useLoginModal";
import { setOptions } from "./features/slice/optionSlice";
import { useMenuItems } from "./hooks/useMenuItems";
import { item } from "./types";

function App() {
  const { setOpen: handleOpenLoginModal } = useLoginModal();
  const { handleOpenAddModal } = useAddModal();
  const { setItems, menuItems } = useMenuItems();
  const [allItems, setAllItems] = useState<item [] | null>()
  const [filter, setFilter] = useState("All");

  const user = useSelector((state: any) => state.user.user);

  const dispatch = useDispatch();

  const menuItemsRef = ref(database, "/menuItems");
  const optionsRef = ref(database, "/menuOptions");

  useEffect(() => {
    const unsubscribeMenuItems = onValue(menuItemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setItems(itemsArray);
        setAllItems(itemsArray)
      } else {
        setItems([]);
      }
    });

    const unsubscribeOptions = onValue(optionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const optionsArray = Object.keys(data).map((key) => data[key]);
        dispatch(setOptions(optionsArray.map((option) => option.optionName)));
      } else {
        dispatch(setOptions([]));
      }
    });

    return () => {
      unsubscribeMenuItems();
      unsubscribeOptions();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAdd = () => {
    if (!user) {
      handleOpenLoginModal(true);
    } else {
      handleOpenAddModal();
    }
  };

  const handleSetFilter = (category: string) => {
    setFilter(category);
    if(category === 'All'){
      setItems(allItems || [])
    } else {
      const filteredItems = allItems?.filter((item) => item.category === category);
      setItems(filteredItems || [])
    }
   
  }

  const loop = ["", "", "", ""];

  const categories = [
    "All",
    "Appetizers",
    "Soups & Salads",
    "Main Courses",
    "Sides",
    "Desserts",
    "Beverages",
  ];

  if (!menuItems) {
    return (
      <>
        <Navbar />
        <div className="pt-28">
          <Container>
            <div className="flex flex-row justify-between w-full items-center">
              <div className="font-semibold text-slate-800 text-2xl">Menu</div>
            </div>
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-12">
              {loop.map((card, key) => (
                <div key={key}>
                  <SkeletonCard />
                </div>
              ))}
            </div>
          </Container>
        </div>
      </>
    );
  }

  return (
    <>
      <MenuModal />
      <Navbar />
      <div className="pt-24">
        <Container>
          <div className="flex flex-row justify-between w-full items-center">
            <div className="font-semibold text-slate-800 text-2xl">Menu</div>
            {menuItems.length > 0 && (
              <div>
                <Button
                  className="px-6 text-base font-semibold flex flex-row gap-x-2 items-center"
                  size={"lg"}
                  onClick={openAdd}
                >
                  <Plus size={18} /> Add Menu
                </Button>
              </div>
            )}
          </div>
          <div className="flex flex-row gap-x-6 pt-5  ">
            {categories.map((item, index) => (
              <div
                className={`flex rounded-xl p-4 px-8 bg-white shadow-lg hover:cursor-pointer font-medium ${
                  filter === item
                    ? "bg-green-100 border-[1px] border-green-400"
                    : "hover:bg-green-50"
                } transition-all ease-in-out duration-200`}
                key={index}
                onClick={() => handleSetFilter(item)}
              > 
                {item}
              </div>
            ))}
          </div>
          {menuItems.length === 0 ? (
            <EmptyHeading
              title="No items yet."
              subtitle="Click button below to add an item."
              isEmptyItems
            />
          ) : (
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-12">
              {menuItems.map((item, key) => (
                <ItemCard key={key} item={item} />
              ))}
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

export default App;
