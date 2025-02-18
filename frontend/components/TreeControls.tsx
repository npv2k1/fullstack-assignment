"use client";
import { useMenuState } from "@/stores/menu";
import React from "react";

export function TreeControls() {
  const { setIsExpanded } = useMenuState();
  return (
    <div className="flex gap-2 items-start self-stretch text-sm font-bold tracking-tight leading-none text-center">
      <button
        onClick={() => setIsExpanded(true)}
        className="px-8 py-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
      >
        Expand All
      </button>
      <button
        onClick={() => setIsExpanded(false)}
        className="px-8 py-3 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
      >
        Collapse All
      </button>
    </div>
  );
}
