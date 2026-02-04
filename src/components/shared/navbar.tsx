"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useMemo } from "react";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { AuthSection } from "./auth-section";

interface MenuItem {
  title: string;
  url: string;
  role?: string;
}

interface NavbarProps {
  className?: string;
}

const menu: MenuItem[] = [
  { title: "Home", url: "/" },
  { title: "Shop", url: "/shop" },
  { title: "Medicine", url: "/medicine", role: "SELLER" },
];

export default function Navbar({ className }: NavbarProps) {
  const { data, isPending } = authClient.useSession();
  const userRole = (data?.user as any)?.role ?? null;

  const visibleMenus = useMemo(() => {
    return menu.filter((item) => {
      if (!item.role) return true;
      if (isPending) return true;
      return item.role === userRole;
    });
  }, [userRole, isPending]);

  return (
    <header className={cn("border-b", className)}>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          MediStore 💊
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <MenuRenderer items={visibleMenus} isPending={isPending} />
            </NavigationMenuList>
          </NavigationMenu>

          <AuthSection data={data} isPending={isPending} />
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <Link href="/">MediStore 💊</Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-3.5 items-center">
                <MenuRenderer
                  items={visibleMenus}
                  isPending={isPending}
                  mobile
                />

                <AuthSection data={data} isPending={isPending} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MenuRenderer({
  items,
  isPending,
  mobile = false,
}: {
  items: MenuItem[];
  isPending: boolean;
  mobile?: boolean;
}) {
  return (
    <>
      {items.map((item) => {
        if (item.role && isPending) {
          return <Spinner key={item.url} />;
        }

        return mobile ? (
          <MobileItem key={item.url} item={item} />
        ) : (
          <DesktopItem key={item.url} item={item} />
        );
      })}
    </>
  );
}

function DesktopItem({ item }: { item: MenuItem }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={item.url}
          className="px-3 py-2 text-sm font-medium hover:text-primary"
        >
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function MobileItem({ item }: { item: MenuItem }) {
  return (
    <Link href={item.url} className="text-sm font-medium">
      {item.title}
    </Link>
  );
}
