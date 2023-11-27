class CartManager {
    constructor() {
      this.carts = [];
    }
  
    createCart(newCart) {
      const cartId = this.generateCartId();
      const cart = { id: cartId, ...newCart, products: [] };
      this.carts.push(cart);
      return cart;
    }
  
    getCartById(cartId) {
      return this.carts.find(cart => cart.id === cartId);
    }
  
    addProductToCart(cartId, productId, quantity) {
      const cart = this.getCartById(cartId);
      if (cart) {
        const existingProduct = cart.products.find(product => product.id === productId);
  
        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          cart.products.push({ id: productId, quantity });
        }
  
        // Implementar la persistencia del carrito si es necesario
  
        return cart;
      }
      return null;
    }
  
    generateCartId() {
      return this.carts.length + 1;
    }
  }
  
  export default CartManager;
  