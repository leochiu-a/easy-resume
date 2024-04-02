import { NextRequest } from "next/server"

const protectedRoutes = [
  /\/resumes$/,
  /\/resumes\/(?<id>.*)$/,
  /\/resumes\/(?<id>.*)\/edit$/,
  /account/,
]
const authRoutes = ["/login"]

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value

  if (
    protectedRoutes.some((path) => path.test(request.nextUrl.pathname)) &&
    !accessToken
  ) {
    request.cookies.delete("accessToken")

    return Response.redirect(new URL("/login", request.url))
  }

  if (authRoutes.includes(request.nextUrl.pathname) && accessToken) {
    return Response.redirect(new URL("/resumes", request.url))
  }
}

export const config = {
  matcher: [...protectedRoutes, ...authRoutes],
}
