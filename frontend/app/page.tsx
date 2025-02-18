import { MenuForm } from "@/components/MenuForm";
import { MenuHeader } from "@/components/MenuHeader";
import { MenuTree } from "@/components/MenuTree";

export default function Home() {
  return (
    <div className="w-full max-md:mt-6 max-md:max-w-full">
      <MenuHeader />
      <div className="flex flex-col items-start px-12 mt-3 w-full max-md:px-5 max-md:max-w-full">
        <MenuForm />
        <MenuTree />
      </div>
    </div>
  );
}
