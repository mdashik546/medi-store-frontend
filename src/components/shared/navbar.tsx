"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { menu_data } from "./menu-data";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "../ui/spinner";
import { AuthSection } from "./auth-section";

export default function Navbar() {
  const { data, isPending } = authClient.useSession();
  const pathname = usePathname();
  const role = (data?.user as any)?.role || "PUBLIC";
  const links = menu_data[role];

  return (
    <div className="relative mb-20">
      <nav className="fixed top-0 h-14 z-50 bg-white container mx-auto border-b">
        <div className="flex h-14 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="font-bold text-lg">
            MediShop💊
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            {isPending ? (
              <div className="flex items-center gap-2">
                <Spinner />
              </div>
            ) : (
              <Render pathname={pathname} links={links} />
            )}
          </div>
          {/* Right Side */}
          {isPending ? (
            <div className="flex items-center gap-2">
              <Spinner />
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <AuthSection data={data} isPending={isPending} />
            </div>
          )}
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64">
              <div className="flex flex-col gap-4 mt-6 px-5">
                <Render pathname={pathname} links={links} />
                <hr />

                <AuthSection data={data} isPending={isPending} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}
function Render({ links, pathname }: any) {
  return links.map((item: any) => (
    <Link
      key={item.href}
      href={item.href}
      className={`
        text-sm font-medium transition
        ${
          pathname === item.href
            ? "text-primary"
            : "text-muted-foreground hover:text-primary"
        }
      `}
    >
      {item.label}
    </Link>
  ));
}
