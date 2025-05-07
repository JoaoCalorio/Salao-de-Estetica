// app/middleware.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Função para parsear os cookies
const parseCookies = (cookies: string) => {
  return cookies.split(';').reduce((acc: { [key: string]: string }, cookie) => {
    const [name, value] = cookie.split('=');
    acc[name.trim()] = value;
    return acc;
  }, {});
};

// Middleware para verificar autenticação
export function middleware(req: NextRequest) {
  // Obtenha os cookies como string
  const cookies = req.headers.get('cookie') || '';

  const parsedCookies = parseCookies(cookies);

  const token = parsedCookies['authToken'];

  console.log('Token no middleware:', token);

  if (!token || token !== 'admin-token') {
    console.log('Redirecionando para /login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/homepage', '/buscacpf', '/cadastro'],  
};
