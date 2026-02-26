import SellerAdminSidebar from "@/components/seller-admin-sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Users", href: "/admin/users" },
    { label: "Categories", href: "/admin/categories" },
  ];
  return (
    <div className="flex lg:flex-row flex-col gap-5">
      <SellerAdminSidebar navItems={navItems} heading="Admin" />
      <div className="w-full pr-5">{children}</div>
    </div>
  );
};

export default Layout;
