import { NextResponse } from "next/server";
import { parse } from "cookie";

export function middleware(req) {
  const cookie = parse(req.headers.get("cookie") || "");
  const url = req.nextUrl;

  const protectedRoutes = {
    "/dashboard": "Token",
    "/freelancerDashboard": "accessToken",
    "/clientDashboard": "accessToken",
    "/password": "email",
  };

  const requiredCookie = protectedRoutes[url.pathname];
  if (requiredCookie && !cookie[requiredCookie]) {
    const redirectTo =
      url.pathname === "/password" ? "/ResetPassword" : "/login";
    return NextResponse.redirect(new URL(redirectTo, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/Hero",
    "/password",
    "/dashboard",
    "/freelancerDashboard",
    "/clientDashboard",
  ],
};
