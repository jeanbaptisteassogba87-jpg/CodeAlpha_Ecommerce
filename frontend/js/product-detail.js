import { API_URL } from "./config.js";

async function loadProductDetail(productId) {
    try {
        const response = await fetch(`${API_URL}products/${productId}/`);

        if (response.ok) {
            const product = await response.json();
            return product;
        } else {
            console.error('Erreur lors du chargement du produit');
            return null;
        }
    } catch (error) {
        console.error('Erreur réseau', error);
        return null;
    }
}

export { loadProductDetail };