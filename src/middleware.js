import { defineMiddleware } from "astro:middleware";
import PocketBase from "pocketbase";

export const onRequest = defineMiddleware(async (context, next) => {
  // Utiliser la même logique que pb.ts
  const pbUrl = import.meta.env.MODE === 'development' 
    ? 'http://localhost:8090' 
    : 'https://tavue.fryg.fr';
  
  const pb = new PocketBase(pbUrl);
  
  // Charger l'authentification depuis le cookie
  const authCookie = context.cookies.get("pb_auth");
  if (authCookie) {
    pb.authStore.loadFromCookie(authCookie.value);
  }

  // Stocker PocketBase et l'utilisateur dans les locals
  context.locals.pb = pb;
  context.locals.user = pb.authStore.isValid ? pb.authStore.record : null;

  // Autoriser l'accès aux routes API et publiques
  const publicRoutes = ["/", "/connexion", "/inscription"];
  const apiRoutes = ["/api/login", "/api/generateSVG"];
  
  if (
    publicRoutes.includes(context.url.pathname) ||
    apiRoutes.some(route => context.url.pathname.startsWith(route))
  ) {
    return next();
  }

  // Routes protégées
  const protectedRoutes = ["/personnaliser", "/gallery"];
  const isProtected = protectedRoutes.some(route => 
    context.url.pathname.startsWith(route)
  );

  if (isProtected && !context.locals.user) {
    return context.redirect("/connexion", 303);
  }

  return next();
});
