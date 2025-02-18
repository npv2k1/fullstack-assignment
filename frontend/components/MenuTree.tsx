"use client";
import * as React from "react";
import { TreeControls } from "./TreeControls";
import { TreeView } from "./TreeView";
import { MenuDetails } from "./MenuDetails";

export function MenuTree() {
  return (
    <div className="flex flex-wrap gap-5 justify-between self-stretch mt-6 max-md:max-w-full">
      <div className="flex flex-1 flex-col items-start mt-1 space-y-[24px]">
        <TreeControls />
        <TreeView />
      </div>
      <MenuDetails />
    </div>
  );
}
