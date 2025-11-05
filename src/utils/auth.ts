// Utilitaires pour gérer les cookies d'authentification

/**
 * Définir un cookie
 */
export function setCookie(name: string, value: string, days: number = 7) {
  const maxAge = days * 24 * 60 * 60; // Convertir en secondes
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Strict`;
}

/**
 * Récupérer un cookie
 */
export function getCookie(name: string): string | null {
  const cookies = document.cookie.split(';');
  
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  
  return null;
}

/**
 * Supprimer un cookie
 */
export function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Strict`;
}

/**
 * Récupérer les données d'authentification
 */
export function getAuthData() {
  const authCookie = getCookie('pocketbase_auth');
  if (authCookie) {
    try {
      return JSON.parse(authCookie);
    } catch (e) {
      console.error('Erreur lors de la lecture du cookie d\'authentification:', e);
      return null;
    }
  }
  return null;
}

/**
 * Sauvegarder les données d'authentification
 */
export function setAuthData(data: any, days: number = 7) {
  const authString = JSON.stringify(data);
  setCookie('pocketbase_auth', authString, days);
  // Aussi dans localStorage pour compatibilité
  localStorage.setItem('pocketbase_auth', authString);
}

/**
 * Supprimer les données d'authentification
 */
export function clearAuthData() {
  deleteCookie('pocketbase_auth');
  localStorage.removeItem('pocketbase_auth');
}

/**
 * Vérifier si l'utilisateur est authentifié
 */
export function isAuthenticated(): boolean {
  const authData = getAuthData();
  return authData !== null && authData.token !== undefined;
}
