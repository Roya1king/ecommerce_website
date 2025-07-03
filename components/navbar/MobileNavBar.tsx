import React from "react";
import NavItems from "./NavItems";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Props {
  loggedInUser?: {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  };
}

const MobileNavBar = ({loggedInUser}:Props) => {
  return (
    <Sheet>
      <SheetTrigger>
        <GiHamburgerMenu className="text-3xl cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-center font-bold text-xl">
            {" "}
            Shoppit
          </SheetTitle>
        </SheetHeader>
        <NavItems mobile loggedInUser={loggedInUser} />
        {/* <SheetClose className="overflow-y-auto">
          <NavItems mobile />
        </SheetClose> */}
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavBar;
