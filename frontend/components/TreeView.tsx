"use client";
import { useMenuTree } from "@/services/menu.query";
import { useMenuState } from "@/stores/menu";
import { TreeItem } from "./TreeItem";

export function TreeView() {
  const { selectedMenu, isExpanded } = useMenuState();
  const { data, isLoading } = useMenuTree(selectedMenu || "");
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-4">
      <TreeItem menu={data} depth={0} isExpanded={isExpanded} />
    </div>
  );
}
