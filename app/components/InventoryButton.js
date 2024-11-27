import { useState } from "react";
import useGameStore from "./gameStore";

export default function InventoryButton() {
      const potions = useGameStore((state) => state.potions);
      const pokeballs = useGameStore((state) => state.pokeballs);

      const usePotion = useGameStore((state) => state.usePotion);

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
                        {!inventoryOpen && "INVENTORY"}
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
                                          className="p-4 hover:cursor-pointer hover:underline"
                                          onClick={() => toggleModal("potions")}
                                    >
                                          Potions
                                    </div>
                                    <div
                                          className={`h-0 px-4 max-h-0 overflow-hidden text-2xl lg:text-4xl ${
                                                isOpen.potions
                                                      ? "max-h-[300px] h-[300px] py-4"
                                                      : ""
                                          } `}
                                    >
                                          {potions.map((potion, index) => {
                                                const noPotions =
                                                      potion.quantity === 0;
                                                return (
                                                      <div
                                                            key={index}
                                                            className={`flex w-full justify-between mb-4 hover:cursor-pointer hover:underline hover:text-amber-300 ${noPotions ? "pointer-events-none opacity-30" : ""}`}
                                                          onClick={() => usePotion(potion, true)}
                                                      >
                                                            <div>
                                                                  {potion.name}
                                                            </div>
                                                            <div>
                                                                  {
                                                                        potion.quantity
                                                                  }
                                                            </div>
                                                      </div>
                                                );
                                          })}
                                    </div>
                              </div>
                              <div className="text-5xl lg:text-7xl p-8 w-full">
                                    <div
                                          className="p-4 hover:cursor-pointer hover:underline"
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
                                          {pokeballs.map((pokeball, index) => (
                                                <div
                                                      key={index}
                                                      className="flex w-full justify-between mb-4 hover:cursor-pointer hover:underline hover:text-amber-300"
                                                >
                                                      <div>{pokeball.name}</div>
                                                      <div>
                                                            {pokeball.quantity}
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      );
}
