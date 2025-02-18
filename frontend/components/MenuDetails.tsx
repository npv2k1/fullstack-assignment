"use client";
import { cn } from "@/lib/utils";
import { useCreateMenu, useUpdateMenu } from "@/services/menu.query";
import { useMenuState } from "@/stores/menu";
import React, { useEffect, useState } from "react";

// UI components could be moved to a separate file if reused elsewhere
const FormField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col mt-4 max-w-full text-black w-[262px]">
    <label className="gap-1 self-start text-sm tracking-tight leading-none">
      {label}
    </label>
    {children}
  </div>
);

const ReadOnlyField = ({ value }: { value: string | number }) => (
  <div className="flex gap-4 items-center px-4 py-3.5 mt-2 w-full text-base tracking-tight leading-4 whitespace-nowrap bg-gray-50 rounded-2xl min-h-[52px]">
    <span className="flex-1 shrink my-auto basis-0">{value}</span>
  </div>
);

export function MenuDetails() {
  const { selectedMenuItem, isAdding, setIsAdding } = useMenuState();
  const [name, setName] = useState("");

  const { mutateAsync: doCreate } = useCreateMenu();
  const { mutateAsync: doUpate } = useUpdateMenu(selectedMenuItem?.id ?? "");

  const handleSave = async () => {
    if (isAdding) {
      await doCreate({ name, parentId: selectedMenuItem?.id });
    } else {
      await doUpate({ name });
    }
    setName("");
    setIsAdding(false);
  };

  useEffect(() => {
    if (isAdding) {
      setName("");
      return;
    }
    setName(selectedMenuItem?.name ?? "");
  }, [selectedMenuItem, isAdding]);

  return (
    <aside className="flex flex-1 flex-col items-start self-start max-md:max-w-full">
      <FormField label="Menu ID">
        <ReadOnlyField value={selectedMenuItem?.id ?? ""} />
      </FormField>
      <FormField label="Depth">
        <ReadOnlyField value={selectedMenuItem?.depth ?? 0} />
      </FormField>
      <FormField label="Parent Data">
        <ReadOnlyField value={selectedMenuItem?.parent?.name || ""} />
      </FormField>
      <FormField label="Name">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 shrink gap-4 self-stretch px-4 py-3.5 mt-2 w-full text-base tracking-tight bg-white border rounded-2xl min-h-[52px]"
          autoFocus
        />
      </FormField>

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleSave}
          className={cn(
            "px-8 py-3 text-sm font-bold text-white rounded-full",
            "bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400"
          )}
        >
          {isAdding ? "Add" : "Save"}
        </button>
      </div>
    </aside>
  );
}
