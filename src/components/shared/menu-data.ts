export type NavItem = {
  label: string;
  href: string;
};

export const menu_data: Record<string, NavItem[]> = {
  PUBLIC: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
  ],

  CUSTOMER: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Cart", href: "/cart" },
    { label: "Orders", href: "/orders" },
  ],

  SELLER: [
    { label: "Dashboard", href: "/seller/dashboard" },
    { label: "Medicines", href: "/seller/medicines" },
    { label: "Orders", href: "/seller/orders" },
  ],

  ADMIN: [{ label: "Dashboard", href: "/admin/dashboard" }],
};
