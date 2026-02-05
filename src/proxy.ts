import { NextResponse, NextRequest } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";
const PROTECTED_ROUTES = {
  admin: ["/admin/dashboard"],
  seller: ["/seller/dashboard", "/seller/medicines", "/seller/orders"],
  customer: ["/cart", "/orders"],
  authenticated: [
    "/admin/dashboard",
    "/seller/dashboard",
    "/seller/medicines",
    "/seller/orders",
    "/cart",
    "/orders",
  ],
  public: ["/login", "/register"],
};
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const { session, user } = await userService.getSession();
  const isAuthenticated = !!session;
  const userRole = user?.role;

  if (!isAuthenticated && isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && isAuthPage(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAuthenticated && userRole !== Roles.customer && isCustomerRoute(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && userRole !== Roles.seller && isSellerRoute(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && userRole !== Roles.admin && isAdminRoute(pathname)) {
    return NextResponse.redirect(new URL("/seller/dashboard", request.url));
  }

  return NextResponse.next();
}
function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.authenticated.some((route) =>
    pathname.startsWith(route),
  );
}

function isAuthPage(pathname: string): boolean {
  return PROTECTED_ROUTES.public.some((route) => pathname === route);
}

function isAdminRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.admin.some((route) => pathname.startsWith(route));
}

function isSellerRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.seller.some((route) => pathname.startsWith(route));
}
function isCustomerRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.customer.some((route) => pathname.startsWith(route));
}

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/login",
    "/register",
    "/orders",
    "/cart",
    "/seller/dashboard/:path*",
    "/seller/medicines",
    "/seller/orders",
  ],
};
