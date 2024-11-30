import { NextResponse } from "next/server";
import { parse } from "cookie";

export function middleware(req) {
  const cookie = parse(req.headers.get("cookie") || "");

  if (!cookie.Token && req.nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!cookie.email && req.nextUrl.pathname === "/password") {
    return NextResponse.redirect(new URL("/ResetPassword", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Hero", "/password", "/dashboard"],
};
