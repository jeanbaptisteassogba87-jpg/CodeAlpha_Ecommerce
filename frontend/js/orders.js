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

    // Calculer le total
    const total = cartItems.reduce((sum, item) => sum + item.total, 0);

    // 1. Créer la commande
    const response = await fetch(`${API_URL}orders/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            total: total,
            address: address,
            status: 'En attente'
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Erreur lors de la création de la commande');
    }

    const order = await response.json();

    // 2. Ajouter les items à la commande
    for (const item of cartItems) {
        await fetch(`${API_URL}order-items/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                order: order.id,
                product: item.productId,
                quantity: item.quantity,
                price: item.price
            })
        });
    }

    return order;
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