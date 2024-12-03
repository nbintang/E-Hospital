import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = await getToken({ req });
  const adminPathname = pathname.startsWith("/dashboard");
  const doctorPathname = pathname.startsWith("/doctor/dashboard");
  if (!token) {
    if (pathname === "/" || pathname === "/signup") {
      return NextResponse.next(); // Allow access to home and signup
    }
    return NextResponse.redirect(new URL("/", req.nextUrl)); // Redirect to home for other paths
  }

  const userRole = token.role;

  // Handle access based on user role
  if (userRole === "PATIENT") {
    // Redirect patients trying to access admin or doctor dashboards
    if (adminPathname || doctorPathname) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  if (userRole === "ADMIN" && !adminPathname) {
    // Redirect admin to the dashboard if they try to access a non-admin route
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (userRole === "DOCTOR" && !doctorPathname) {
    // Redirect doctor to their dashboard if they try to access a non-doctor route
    return NextResponse.redirect(new URL("/doctor/dashboard", req.nextUrl));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)" ]};