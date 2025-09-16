import { NextResponse } from "next/server";

export function middleware(req) {
  // COMMENTED OUT FOR FRONTEND DEVELOPMENT
  // const token = req.cookies.get("token")?.value;

  // // list of protected routes
  // const protectedRoutes = ["/dashboard"];

  // if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  // }

  return NextResponse.next();
}

// COMMENTED OUT FOR FRONTEND DEVELOPMENT
// export const config = {
//   matcher: ["/dashboard/:path*"],
// };
