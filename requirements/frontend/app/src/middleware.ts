import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("tokens");

    if (request.nextUrl.pathname !== "/" && !token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (request.nextUrl.pathname == "/" && token) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/profile", "/", "/game"],
};

// uploading images
// entring the game queue 