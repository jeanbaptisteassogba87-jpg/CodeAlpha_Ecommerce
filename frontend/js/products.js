import { API_URL } from "./config.js";

async function loadProducts() {
    try {
        // ⚠️ NE PAS AJOUTER DE TOKEN ICI
        const response = await fetch(`${API_URL}products/`);

        if (response.ok) {
            const products = await response.json();
            return products;
        } else {
            console.error('Erreur lors du chargement des produits !');
            return [];
        }
    } catch (error) {
        console.error('Erreur réseau', error);
        return [];
    }
}

export { loadProducts };