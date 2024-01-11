import { createStore } from "vuex";

export default createStore({
    state: {
        orderedItems: [],
    },

   mutations: {
        addToCart(state, product) {
            console.log(product);
            const item = state.orderedItems.find(item => item.ProductId === product.ProductId);
            // If the product is already in the cart, increase its quantity
            if (item) {
                item.Quantity++;
            } else {
                // Otherwise, add it to the cart
                state.orderedItems.push({
                    ...product,
                    Quantity: 1
                });
            }
        }
   }
});