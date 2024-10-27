import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("accessToken");

    // Check if the request is for the /profile page and if the token is missing
    if (request.nextUrl.pathname !== "/" && !token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile"],
};