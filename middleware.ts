import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = await getToken({ req });
  const adminPathname = pathname.startsWith("/dashboard");
  const doctorPathname = pathname.startsWith("/doctor/dashboard");
  const publicRoutes = [
    "/", // Patient-specific route
    "/signup",
    "/articles",
    "/about",
    "/questions",
    "/drugstore",
    "/appointments",
    "/account",
    "/cart"
  ];

  const dynamicPublicRoutes = [
    /^\/articles\/[^\/]+$/, // Matches /articles/[slug]
    /^\/products\/[^\/]+$/, // Matches /products/[slug]
    /^\/questions\/[^\/]+$/, // Matches /tanya-dokter/[slug]
    /^\/drugstore\/[^\/]+$/, // Matches /drugstore/[slug]
    /^\/appointments\/[^\/]+$/, // Matches /buat-janji/[slug]
    /^\/account\/[^\/]+$/, // Matches /account/[slug]
    /^\/cart\/[^\/]+$/, // Matches /cart/[slug]
  ];

  // Allow access to public routes without authentication
  if (
    !token &&
    (publicRoutes.includes(pathname) ||
      dynamicPublicRoutes.some((rgx) => new RegExp(rgx).test(pathname)))
  ) {
    return NextResponse.next();
  }

  // If no token, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  const userRole = token.role;

  // Prevent DOCTOR or ADMIN from accessing patient-specific routes
  if (
    (userRole === "DOCTOR" || userRole === "ADMIN") &&
    (publicRoutes.includes(pathname) ||
      dynamicPublicRoutes.some((rgx) => new RegExp(rgx).test(pathname)))
  ) {
    const redirectURL =
      userRole === "ADMIN" ? "/dashboard" : "/doctor/dashboard";
    return NextResponse.redirect(new URL(redirectURL, req.nextUrl));
  }
  
  // Prevent PATIENT from accessing ADMIN or DOCTOR routes
  if (userRole === "PATIENT" && (adminPathname || doctorPathname)) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // Ensure ADMIN can only access ADMIN routes
  if (userRole === "ADMIN" && !adminPathname) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // Ensure DOCTOR can only access DOCTOR routes
  if (userRole === "DOCTOR" && !doctorPathname) {
    return NextResponse.redirect(new URL("/doctor/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)"],
};
