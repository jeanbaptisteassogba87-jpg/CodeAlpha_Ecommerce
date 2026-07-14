import { loadProducts } from './products.js';

function getCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
        return JSON.parse(cart);
    }
    return [];
}

async function addToCart(productId, quantity = 1) {
    if (quantity <= 0) {
        return { success: false, message: 'La quantité doit être positive.' };
    }

    const products = await loadProducts();
    const product = products.find(p => p.id === productId);

    if (!product) {
        return { success: false, message: 'Produit introuvable.' };
    }

    if (quantity > product.stock) {
        return { success: false, message: `Stock insuffisant. Il reste ${product.stock} exemplaire(s).` };
    }

    const cart = getCart();
    const existingItem = cart.find(item => item.productId === productId);
    const currentQuantity = existingItem ? existingItem.quantity : 0;

    if (currentQuantity + quantity > product.stock) {
        return { success: false, message: `Vous ne pouvez pas ajouter plus que le stock disponible (${product.stock}).` };
    }

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    return { success: true, message: `${quantity} "${product.name}" ajouté au panier !` };
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function clearCart() {
    localStorage.removeItem('cart');
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