import { useState } from "react";

export default function InventoryButton() {
      const [inventoryOpen, setInventoryOpen] = useState(false);
      const toggleMenu = () => {
            setInventoryOpen(!inventoryOpen);
      };
      const [isOpen, setIsOpen] = useState({
            potions: false,
            pokeballs: false,
      });
      const toggleModal = (modal) => {
            setIsOpen((prevState) => ({
                  [modal]: !prevState[modal],
            }));
            console.log(isOpen);
      };
      return (
            <>
                  <div
                        className={`fixed z-50 top-0 right-0 text-lg lg:text-3xl p-4 lg:p-12 hover:cursor-pointer text-foreground hover:underline ${
                              inventoryOpen ? "bg-transparent" : "bg-background"
                        }`}
                        onClick={toggleMenu}
                  >
                        {!inventoryOpen && "Inventory"}
                        {inventoryOpen && "CLOSE"}
                  </div>
                  <div
                        className={`fixed w-full top-0 left-0 h-full z-40 bg-[rgba(0,0,0,0.9)] text-foreground  ${
                              inventoryOpen
                                    ? "opacity-100 pointer-events-auto"
                                    : "opacity-0 pointer-events-none"
                        }`}
                  >
                        <div className="flex h-full w-full gap-6 flex-col items-start justify-center">
                              <div className="text-5xl lg:text-7xl p-8 w-full">
                                    <div
                                          className="border-b p-4"
                                          onClick={() => toggleModal("potions")}
                                    >
                                          Potions
                                    </div>
                                    <div
                                          className={`h-0 px-4 max-h-0 overflow-hidden text-xl lg:text-4xl ${
                                                isOpen.potions
                                                      ? "max-h-[300px] h-[300px] py-4"
                                                      : ""
                                          } `}
                                    >
                                          This is where you would find your
                                          Potions.
                                    </div>
                              </div>
                              <div className="text-5xl lg:text-7xl p-8 w-full">
                                    <div
                                          className="border-b p-4"
                                          onClick={() =>
                                                toggleModal("pokeballs")
                                          }
                                    >
                                          Pokeballs
                                    </div>
                                    <div
                                          className={`h-0 px-4 max-h-0 overflow-hidden  text-xl lg:text-4xl ${
                                                isOpen.pokeballs
                                                      ? "max-h-[300px] h-[300px]  py-4"
                                                      : ""
                                          } `}
                                    >
                                          This is where you would find your
                                          Pokeballs.
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      );
}
