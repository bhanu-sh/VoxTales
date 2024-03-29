import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/' || path === '/signup' || path === '/verifyemail' || path === '/signup/admin' || path === '/login/admin'

    const isAdminPath = path === '/admin'

    const token = request.cookies.get('token')?.value || ''

    const isAdmin = request.cookies.get('isAdmin')?.value || ''

    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    if(isAdminPath && isAdmin !== 'true') {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/profile", 
        "/login", 
        "/signup",
        "/verifyemail",
        "/admin",
        "/signup/admin",
        "/login/admin",
    ]
};
