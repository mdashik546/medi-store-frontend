"use client";
import { Footer } from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { usePathname } from "next/navigation";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const sellerIsAdmin =
    pathname.includes("/seller/dashboard") ||
    pathname.includes("/admin/dashboard");
  return (
    <div className="container mx-auto xl:px-0 md:px-4 sm:px-0 px-4">
      {!sellerIsAdmin && <Navbar />}
      {children}
      {!sellerIsAdmin && <Footer />}
    </div>
  );
};

export default CommonLayout;
