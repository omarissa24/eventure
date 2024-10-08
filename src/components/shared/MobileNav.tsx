"use client";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";

const MobileNav = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleNavItemClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <nav className='md:hidden'>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger
          className='align-middle'
          onClick={() => setIsSheetOpen(true)}
        >
          <Image
            src='/assets/icons/menu.svg'
            alt='menu'
            width={24}
            height={24}
            className='cursor-pointer'
          />
        </SheetTrigger>
        <SheetContent className='flex flex-col gap-6 bg-white md:hidden'>
          <Image
            src='/assets/images/logo.svg'
            alt='logo'
            width={128}
            height={38}
          />
          <Separator className='border border-gray-50' />
          <NavItems onNavItemClick={handleNavItemClick} />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
