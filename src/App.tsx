import "./App.css";
import Container from "./components/Container";
import ItemCard from "./components/ItemCard";
import Navbar from "./components/Navbar";
import { Button } from "./components/ui/button";
import { Plus } from "lucide-react";
import useMenuModal from "./hooks/useAddModal";
import MenuModal from "./components/modals/menuItems/AddModal";
import { useEffect } from "react";
import { database } from "@/config/firebase";
import { ref, onValue } from "firebase/database";
import EmptyHeading from "./components/EmptyHeading";
import SkeletonCard from "./components/SkeletonCard";
import { useDispatch, useSelector } from "react-redux";
import useLoginModal from "./hooks/useLoginModal";
import { setOptions } from "./features/slice/optionSlice";
import { setMenuItems } from "./features/slice/menuItemsSlice";
import { item } from "./types";

function App() {
  const menuModal = useMenuModal();
  const loginModal = useLoginModal();

  const user = useSelector((state: any) => state.user.user);
  const menuItems: item[] = useSelector((state: any) => state.menuItems.menuItems)

  const dispatch = useDispatch();

  /* const [menuItems, setMenuItems] = useState<item[] | null>(null); */

  useEffect(() => {
    const menuItemsRef = ref(database, "/menuItems");
    const optionsRef = ref(database, "/menuOptions");

    const unsubscribeMenuItems = onValue(menuItemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        dispatch(setMenuItems(itemsArray))
        
      } else {
        dispatch(setMenuItems([]))
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

  const openAddModal = () => {
    if (!user) {
      loginModal.setOpen(true);
    } else {
      menuModal.setOpen(true);
    }
  };

  const loop = ["", "", "", ""];

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
                  className="px-6 flex flex-row gap-x-2 items-center"
                  size={"lg"}
                  onClick={openAddModal}
                >
                  <Plus size={18} /> Add Menu
                </Button>
              </div>
            )}
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
