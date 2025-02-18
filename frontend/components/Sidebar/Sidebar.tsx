import React from "react";
import Logo from "@/assets/logo.svg";
import Menu from "@/assets/Menu.svg";
import FolderIcon from "@/assets/folder-icon.svg";
const Sidebar = () => {
  return (
    <div className="hidden lg:block bg-gray-900 rounded-[24px] w-[240px] h-full mb-[6px]">
      <div className="flex w-full px-[32px] py-[30px] justify-between items-center">
        <Logo></Logo>
        <Menu></Menu>
      </div>
      <div className="rounded-[16px] py-[8px] bg-gray-800">
        <div className="p-[12px] space-x-[16px] flex flex-row text-white">
          <FolderIcon></FolderIcon>
          <div className="flex-1">Systems</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
