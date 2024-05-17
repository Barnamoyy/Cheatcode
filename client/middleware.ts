import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  publicRoutes: ['/',],
  protectedRoutes: ['/dashboard'],
  matcher: ["/((?!.*\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};