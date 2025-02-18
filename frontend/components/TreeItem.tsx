"use client";
import ChevronDownIcon from "@/assets/chevron-down-icon.svg";
import { useMenuTree } from "@/services/menu.query";
import { useMenuState } from "@/stores/menu";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface TreeItemProps {
  menu?: any;
  depth?: number;
  isExpanded?: boolean;
}

export function TreeItem({ menu, depth = 0, isExpanded }: TreeItemProps) {
  const [isOpen, setIsOpen] = useState(isExpanded);
  const { setSelectedMenuItem, setIsAdding } = useMenuState();

  const { data } = useMenuTree(menu.id, {
    enabled: isOpen,
  });

  useEffect(() => {
    setIsOpen(isExpanded);
  }, [isExpanded]);

  return (
    <div className="flex flex-col cursor-pointer ">
      <div
        className="flex flex-row h-[26px] text-[#101828] space-x-[12px] group"
        onClick={() => {
          setSelectedMenuItem({
            ...menu,
            depth: depth ?? 0,
          });
        }}
      >
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          <ChevronDownIcon />
        </div>
        <p>{menu.name}</p>

        <div
          onClick={() => {
            setIsAdding(true);
          }}
          className="hidden w-[20px] h-[20px] cursor-pointer group-hover:flex items-center justify-center  rounded-full bg-[#253BFF] text-white"
        >
          <Plus />
        </div>
      </div>

      <div className="flex flex-col">
        {isOpen && data?.children && (
          <div className="ml-6">
            {data.children.map((child: any) => (
              <TreeItem
                key={child.id}
                menu={{
                  ...child,
                  parent: menu,
                }}
                depth={depth + 1}
                isExpanded={isOpen}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
