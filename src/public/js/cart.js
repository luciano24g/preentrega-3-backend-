document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');

            // Obtener el carrito del localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Verificar si el producto ya está en el carrito
            const existingProduct = cart.find(item => item.productId === productId);

            if (existingProduct) {
                // Si el producto ya está en el carrito, incrementar la cantidad
                existingProduct.quantity++;
            } else {
                // Si el producto no está en el carrito, agregarlo
                cart.push({ productId, quantity: 1 });
            }

            // Guardar el carrito actualizado en el localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Puedes realizar otras acciones aquí, como actualizar la interfaz de usuario, enviar datos al servidor, etc.
            alert('Producto agregado al carrito correctamente.');
        });
    });
});
