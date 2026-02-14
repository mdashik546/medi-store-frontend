import SellerSidebar from "./seller/dashboard/_components/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex lg:flex-row flex-col gap-5">
      <SellerSidebar />
      <div className="w-full pr-5">{children}</div>
    </div>
  );
};

export default Layout;
