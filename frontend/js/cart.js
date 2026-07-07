import { loadProducts } from './products.js';  // ← AJOUTER CETTE LIGNE

function getCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
        return JSON.parse(cart);
    }
    return [];
}

function addToCart(productId, quantity = 1) {
    if (quantity <= 0) {
        console.warn('La quantité doit être positive.');
        return;
    }

    const cart = getCart();
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
        console.log(`Quantité du produit ${productId} augmentée à ${existingItem.quantity}`);
    } else {
        cart.push({ productId, quantity });
        console.log(`Produit ${productId} ajouté au panier (${quantity})`);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(`🗑️ Produit ${productId} retiré du panier`);
}

function clearCart() {
    localStorage.removeItem('cart');
    console.log('Panier vidé');
}

async function getCartDetails() {
    const cart = getCart();

    if (cart.length === 0) {
        return [];
    }

    const products = await loadProducts();

    const cartDetails = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
            productId: item.productId,
            quantity: item.quantity,
            name: product ? product.name : 'Produit inconnu',
            price: product ? product.price : 0,
            image: product ? product.image : null,
            total: product ? product.price * item.quantity : 0
        };
    });

    return cartDetails;
}

export { getCart, addToCart, removeFromCart, clearCart, getCartDetails };