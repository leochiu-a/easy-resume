import { NextRequest } from "next/server"

const protectedRoutes = ["/resumes"]
const authRoutes = ["/login"]

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("accessToken")?.value

  if (protectedRoutes.includes(request.nextUrl.pathname) && !currentUser) {
    request.cookies.delete("currentUser")

    return Response.redirect(new URL("/login", request.url))
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return Response.redirect(new URL("/resumes", request.url))
  }
}

export const config = {
  matcher: [...protectedRoutes, ...authRoutes],
}
