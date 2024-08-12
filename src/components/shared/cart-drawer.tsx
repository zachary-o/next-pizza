"use client";

import { PropsWithChildren } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        <SheetHeader>
          <SheetTitle>
            <span className="fond-bold">3 items</span> in cart
          </SheetTitle>
        </SheetHeader>
        
        <CartDrawerItem id={0} imageUrl={""} name={""} price={0} quantity={0} details={""} />

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Total
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"/>
              </span>
              <span className="font-bold text-lg">$Total amount</span>
            </div>
          <Link href="/cart">
            <Button className="w-full h-12 text-base" type="submit">
              Order
              <ArrowRight className="w-5 ml-2"/>
            </Button>
          </Link>  
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
