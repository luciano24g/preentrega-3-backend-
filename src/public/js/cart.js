document.addEventListener('DOMContentLoaded', () => {
    const removeButtons = document.querySelectorAll('.remove-button');

    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            
            fetch(`/api/cart/remove/${productId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Actualizar la vista o hacer cualquier otra acción necesaria
                    location.reload();
                } else {
                    alert('Error al eliminar el producto del carrito.');
                }
            });
        });
    });
});
