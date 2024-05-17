'use client'

import { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";

import { SignOutButton } from "@clerk/nextjs";

interface MobileSidebarProps {
  darkMode: boolean;
  setDarkMode: () => void;
}

const MobileSidebar:React.FC<MobileSidebarProps> = ({darkMode, setDarkMode}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <Button size={"icon"} variant={"ghost"} className="md:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <div className="flex justify-start items-center space-x-4 px-2 pt-8">
            <h2 className="text-md font-semibold">Appreance</h2>
            <Button variant={'ghost'} onClick={() => setDarkMode()}>
              {darkMode ? <Sun size={24} /> : <Moon size={16} />}
            </Button>
          </div>
          <div className="flex justify-start items-center space-x-4 px-2 pt-4">
            <SignOutButton>
              <Button variant={"ghost"} className="text-md font-semibold p-0">Log out</Button>
            </SignOutButton>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
