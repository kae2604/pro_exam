
export const loadCartFromLocalStorage = () => {
    try {
        const savedCart = localStorage.getItem('shopping_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
        console.error("Could not load cart from LocalStorage:", error);
        return [];
    }
};