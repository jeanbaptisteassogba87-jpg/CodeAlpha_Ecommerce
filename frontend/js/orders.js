import { API_URL } from './config.js';

// Créer une commande
export async function createOrder(cartItems, address) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Vous devez être connecté.');
    }

    if (cartItems.length === 0) {
        throw new Error('Votre panier est vide.');
    }

    const response = await fetch(`${API_URL}create_order/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            cart: cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            })),
            address
        })
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || data.detail || 'Erreur lors de la création de la commande');
    }

    return data;
}

// Récupérer les commandes de l'utilisateur
export async function getUserOrders() {
    const token = localStorage.getItem('token');
    if (!token) return [];

    try {
        const response = await fetch(`${API_URL}orders/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        console.error('Erreur récupération commandes:', error);
        return [];
    }
}

// Récupérer une commande spécifique
export async function getOrderDetails(orderId) {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const response = await fetch(`${API_URL}orders/${orderId}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error('Erreur récupération détail:', error);
        return null;
    }
}

// Annuler une commande
export async function cancelOrder(orderId) {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Connectez-vous');

    const response = await fetch(`${API_URL}orders/${orderId}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'Annulée' })
    });

    if (!response.ok) throw new Error('Erreur lors de l\'annulation');
    return await response.json();
}
