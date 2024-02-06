import { defineStore } from "pinia";

export const useCartStore = defineStore('CartStore',{
    state: () => ({
        carts: [],
        isInitialized: false,
        searchQuery: '',
    }),
    
    getters: {
        cartLength: (state) => state.carts.length,
    },
    
    actions: {
        saveToLocalStorage() {
            if (process.client) {
                localStorage.setItem('cart', JSON.stringify(this.carts));
                console.log('Saving to localStorage', this.carts);
            }
        },
        addToCart(item) {
            this.loadFromLocalStorage();
            this.carts.push(item);
            this.saveToLocalStorage();
        },
        loadFromLocalStorage() {
            if (process.client && !this.isInitialized) {
                console.log('Loading from localStorage');
                const storedCart = localStorage.getItem('cart');
                if (storedCart) {
                    this.carts = JSON.parse(storedCart);
                    this.isInitialized = true; 
                }
            }
        },
        clearCart() {
          this.carts = []; 
          this.saveToLocalStorage(); 
          console.log("Cart cleared.");
      },
      
        onBeforeMount() {
            this.loadFromLocalStorage();
        },
    },
});
