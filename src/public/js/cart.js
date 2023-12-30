// cart.js
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Aquí puedes agregar lógica para verificar si el producto ya está en el carrito y actualizar la cantidad en lugar de agregarlo nuevamente.
            cart.push(productId);

            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Producto agregado al carrito correctamente.');
        });
    });
});
