"use client";
import { useMenus } from "@/services/menu.query";
import { useMenuState } from "@/stores/menu";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function MenuForm() {
  const { setSelectedMenu, selectedMenu } = useMenuState();

  const { data: menu, isLoading } = useMenus();

  useEffect(() => {
    if (isLoading) return;
    if (menu?.length === 0) return;
    setSelectedMenu(menu?.[0]?.id ?? "");
  }, [menu, isLoading]);

  return (
    <Select
      value={selectedMenu ?? ""}
      onValueChange={(value) => setSelectedMenu(value)}
    >
      <SelectTrigger className="flex min-h-[52px] px-[16px] py-[14px] max-w-[317px] items-center gap-[16px] self-stretch rounded-[16px] bg-gray-50">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {menu?.map((item) => {
          return (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
