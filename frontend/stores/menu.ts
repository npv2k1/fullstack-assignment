import { MenuItem } from "@/services/menu.service";
import { create } from "zustand";

interface MenuState {
  selectedMenu: string | null;
  setSelectedMenu: (menuId: string) => void;
  selectedMenuItem: MenuItem | undefined;
  setSelectedMenuItem: (menuItemId: MenuItem) => void;
  isAdding: boolean;
  setIsAdding: (isAdding: boolean) => void;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}

export const useMenuState = create<MenuState>((set) => ({
  selectedMenu: null,
  selectedMenuItem: undefined,
  setSelectedMenu: (menuId: string) => set({ selectedMenu: menuId }),
  setSelectedMenuItem: (menuItemId: MenuItem) =>
    set({ selectedMenuItem: menuItemId }),
  isAdding: false,
  setIsAdding: (isAdding: boolean) => set({ isAdding: isAdding }),
  isExpanded: false,
  setIsExpanded: (isExpanded: boolean) => set({ isExpanded: isExpanded }),
}));
