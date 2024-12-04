import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = await getToken({ req });
  const adminPathname = pathname.startsWith("/dashboard");
  const doctorPathname = pathname.startsWith("/doctor/dashboard");
  const publicRoutes = [
    "/",
    "/signup",
    "/articles",
    "/about",
    "/tanya-dokter",
    "/toko-obat",
    "/buat-janji",
  ];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  const userRole = token.role;

  if (userRole === "PATIENT") {
    if (adminPathname || doctorPathname) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  if (userRole === "ADMIN" && !adminPathname) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (userRole === "DOCTOR" && !doctorPathname) {
    return NextResponse.redirect(new URL("/doctor/dashboard", req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)"],
};
