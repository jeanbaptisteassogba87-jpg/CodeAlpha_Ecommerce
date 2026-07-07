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

// Exporter toutes les fonctions
export { getCart, addToCart, removeFromCart, clearCart };