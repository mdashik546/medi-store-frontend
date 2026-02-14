"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";

export default function SellerAdminSidebar({
  heading,
  navItems,
}: {
  heading: string;
  navItems: {
    label: string;
    href: string;
  }[];
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="lg:min-h-screen">
      <div className="w-64 bg-card shadow-sm border-r border-border hidden lg:flex flex-col sticky top-0 h-screen">
        <aside>
          <div className="p-6 border-b border-border">
            <Link href={"/"} className="text-xl font-bold text-foreground">
              {heading} Panel
            </Link>
          </div>
          <nav className="flex flex-col gap-1 p-4 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-md text-foreground hover:bg-muted transition-colors font-medium text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LogOut className="absolute bottom-5 w-44 -translate-x-1/2 left-1/2" />
        </aside>
      </div>

      <main className="flex-1 flex flex-col">
        <div className="lg:hidden bg-card border-b border-border sticky top-0 z-50">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-bold text-foreground">
              {heading} Panel
            </h2>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-muted rounded-md transition-colors"
            >
              <svg
                className="w-6 h-6 text-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="">
              <nav className="flex flex-col gap-1 p-4 bg-background border-t border-border relative">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 rounded-md text-foreground hover:bg-muted transition-colors font-medium text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <LogOut className="w-40" />
              </nav>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function LogOut({ className }: { className?: string }) {
  return (
    <Button
      className={`${className}`}
      onClick={async () => {
        await authClient.signOut();
        window.location.href = "/login";
      }}
    >
      Logout
    </Button>
  );
}
