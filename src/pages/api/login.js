import PocketBase from "pocketbase";
import { Collections } from "../../utils/pocketbase-types";

export const POST = async ({ request, cookies }) => {
  try {
    // Utiliser la même logique que pb.ts
    const pbUrl = import.meta.env.MODE === 'development' 
      ? 'http://localhost:8090' 
      : 'https://tavue.fryg.fr';
    
    const pb = new PocketBase(pbUrl);

    // Récupère l'email et le mot de passe envoyés dans la requête
    const { email, password } = await request.json();

    console.log("🔍 Tentative de connexion pour:", email);
    console.log("🔗 URL PocketBase:", pb.baseUrl);

    // Authentifie l'utilisateur avec PocketBase en utilisant email et mot de passe
    const authData = await pb
      .collection(Collections.Users)
      .authWithPassword(email, password);

    console.log("✅ Authentification réussie");

    // Enregistre le token d'authentification dans un cookie sécurisé
    cookies.set("pb_auth", pb.authStore.exportToCookie(), {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: import.meta.env.PROD,
      maxAge: 365 * 24 * 60 * 60, // 1 an en secondes
    });

    // Retourne les informations de l'utilisateur authentifié
    return new Response(
      JSON.stringify({ user: authData.record }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json" // ← IMPORTANT
        }
      }
    );
  } catch (err) {
    // En cas d'erreur d'authentification, retourne une erreur
    console.error("❌ Erreur de connexion:", err);
    console.error("Détails:", err.response || err.message);
    
    return new Response(
      JSON.stringify({ 
        error: err.response?.message || err.message || "Identifiants invalides" 
      }), 
      {
        status: 401,
        headers: {
          "Content-Type": "application/json" 
        }
      }
    );
  }
};