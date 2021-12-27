import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/') {
    const session = await getToken({
      req,
      secret: process.env.SECRET,
      secureCookie:
        process.env.NEXTAUTH_URL?.startsWith('https://') ??
        !!process.env.VERCEL_URL,
    });

    if (!session) return NextResponse.redirect('/api/auth/signin');
  }
}
