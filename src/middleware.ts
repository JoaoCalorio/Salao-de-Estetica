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

  // Parse os cookies para um objeto
  const parsedCookies = parseCookies(cookies);

  // Obtenha o valor do cookie "authToken"
  const token = parsedCookies['authToken'];

  // Verifique o valor do token para depuração
  console.log('Token no middleware:', token);

  // Se o token não existir ou o valor não for o esperado, redireciona para o login
  if (!token || token !== 'admin-token') {
    console.log('Redirecionando para /login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Caso o token seja válido, o fluxo continua normalmente
  return NextResponse.next();
}

// Defina quais rotas devem passar pelo middleware
export const config = {
  matcher: ['/homepage', '/buscacpf', '/cadastro'],  // Agora também cobre a rota /cadastro
};
