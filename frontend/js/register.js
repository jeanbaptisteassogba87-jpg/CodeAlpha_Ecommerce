import { API_URL } from "./config.js";

async function register(name, email, password) {
    try {
        const response = await fetch(`${API_URL}users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        if (response.ok) {
            return "Compte créé avec succès";
        } else {
            const data = await response.json();
            return data.detail || "Erreur lors de l'inscription";
        }
    } catch (erreur) {
        return "Erreur de connexion au serveur";
    }
}

export { register };