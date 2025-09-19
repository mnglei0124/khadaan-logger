import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('firebaseToken')?.value; // Replace with actual Firebase auth token check
  const { pathname } = request.nextUrl;

  if (currentUser && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!currentUser && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
