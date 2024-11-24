import { NextResponse } from "next/server";
import { parse } from "cookie";

export function middleware(req) {
  const cookie = parse(req.headers.get("cookie") || "");

  if (!cookie.Token && req.nextUrl.pathname === "/Hero") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Hero"],
};
