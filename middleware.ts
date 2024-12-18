import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { appConfig } from "./config/config";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const cookiesStore = cookies();
  const { authTokenKey } = appConfig;

  const authToken = cookiesStore.get(authTokenKey)?.value;
  const isAuthenticated = Boolean(authToken);

  const unprotectedRoutes = ["/", "/login"];
  const staticAssets = ["/_next/", "/static/"];
  const currentPath = url.pathname;

  // Allow access to static assets and unprotected routes
  if (
    unprotectedRoutes.includes(currentPath) ||
    staticAssets.some((path) => currentPath.startsWith(path))
  ) {
    return NextResponse.next();
  }

  // If not authenticated and accessing a protected route, redirect to /login
  if (!isAuthenticated) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Allow access to authenticated users
  return NextResponse.next();
}

// Configure the middleware to run only on protected routes

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/sims/:path*",
    "/help/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/top-up/:path*",
    "/transactions/:path*",
  ],
};
