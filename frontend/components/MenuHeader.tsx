import * as React from "react";
import FolderIcon from "@/assets/folder-icon.svg";
import SubmenuIcon from "@/assets/submenu-icon.svg";
export function MenuHeader() {
  return (
    <>
      <header className="flex flex-wrap gap-10 justify-between items-center px-12 py-4 w-full text-sm whitespace-nowrap max-md:px-5 max-md:max-w-full">
        <nav className="flex flex-wrap gap-2 items-center self-stretch my-auto rounded-lg">
          <FolderIcon />
          <span className="self-stretch my-auto leading-none text-black rounded-lg w-[5px]">
            /
          </span>
          <span className="self-stretch my-auto font-medium tracking-tight leading-none text-black rounded-lg">
            Menus
          </span>
        </nav>
        <div className="flex gap-2 self-stretch my-auto min-h-[52px] min-w-60 max-md:max-w-full" />
      </header>
      <section className="flex flex-wrap justify-between items-center px-12 py-4 w-full text-3xl font-extrabold tracking-tighter leading-none text-black whitespace-nowrap bg-white max-md:px-5 max-md:max-w-full">
        <div className="flex flex-wrap flex-1 shrink gap-4 items-center self-stretch my-auto basis-0 min-w-60 max-md:max-w-full">
          <div className="w-[52px] rounded-full h-[52px] flex items-center justify-center bg-[#253BFF]">
            <SubmenuIcon />
          </div>
          <h1 className="self-stretch my-auto">Menus</h1>
        </div>
        <div className="flex gap-2 self-stretch my-auto min-h-[52px]" />
      </section>
    </>
  );
}
