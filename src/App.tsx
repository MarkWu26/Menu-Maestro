import "./App.css";
import Container from "./components/Container";
import ItemCard from "./components/ItemCard";
import Navbar from "./components/Navbar";
import { useAddModal } from "./hooks/useAddModal";
import { useEffect, useState } from "react";
import { database } from "@/config/firebase";
import { ref, onValue } from "firebase/database";
import EmptyHeading from "./components/EmptyHeading";
import { useLoginModal } from "./hooks/useLoginModal";
import { useMenuItems } from "./hooks/useMenuItems";
import { item } from "./types";
import CategoryFilter from "./components/CategoryFilter";
import Loading from "./components/Loading";
import Header from "./components/Header";
import { useUser } from "./hooks/useUser";
import { useOptions } from "./hooks/useOptions";

function App() {
  const [allItems, setAllItems] = useState<item[] | null>(); //store all items in a state
  const [filter, setFilter] = useState("All");

  const { setOpen: handleOpenLoginModal } = useLoginModal();
  const { handleOpenAddModal } = useAddModal();
  const { setItems, menuItems } = useMenuItems();
  const { user } = useUser();
  const { setMenuOptions } = useOptions();

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
        setAllItems(itemsArray);
      } else {
        setItems([]);
      }
    });

    const unsubscribeOptions = onValue(optionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const optionsArray = Object.keys(data).map((key) => data[key]);
        setMenuOptions(optionsArray.map((option) => option.optionName));
      } else {
        setMenuOptions([]);
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
    if (category === "All") {
      setItems(allItems || []);
    } else {
      const filteredItems = allItems?.filter(
        (item) => item.category === category
      );
      setItems(filteredItems || []);
    }
  };

  if (!menuItems) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="pt-24">
        <Container>
          <Header openAddModal={openAdd} />
          <div className="flex flex-row py-8  sm:py-6 overflow-x-auto">
            <CategoryFilter handleSetFilter={handleSetFilter} filter={filter} />
          </div>
          {menuItems.length === 0 ? (
            <EmptyHeading
              title="No items yet."
              subtitle="Click button below to add an item."
              isEmptyItems
            />
          ) : (
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-12">
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
