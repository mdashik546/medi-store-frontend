import { NextResponse, NextRequest } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const response = await userService.getSession();
  const session = response?.session ?? null;
  const isAuthenticated = !!session;
  const isAdmin = response?.user?.role === Roles.admin;
  const isSeller = response?.user?.role === Roles.seller;

  if (
    !isAuthenticated &&
    (pathname.startsWith("/dashboard") ||
      pathname.startsWith("/admin-dashboard") ||
      pathname.startsWith("/medicine"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAuthenticated && !isSeller && pathname.startsWith("/medicine")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/isAdmin-dashboard", request.url));
  }
  if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/login",
    "/register",
    "/medicine",
  ],
};
