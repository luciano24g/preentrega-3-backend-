function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  // Resto del código en products.js
  
  // Dentro del evento click del botón
  button.addEventListener('click', async () => {
    console.log('Click en el botón');
    const productId = button.dataset.productId;
  
    // Obtén el cartId desde la cookie
    const cartId = getCookie('cartId');
  
    if (!cartId) {
      console.error('No se pudo obtener el cartId desde la cookie.');
      return;
    }
  
    const quantity = 1; // Puedes ajustar la cantidad según tus necesidades
  
    try {
      // Realiza la solicitud POST al servidor para agregar el producto al carrito
      const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Producto agregado al carrito:', data);
      } else {
        console.error('Error al agregar producto al carrito:', data.error);
      }
    } catch (error) {
      console.error('Error de red:', error.message);
    }
  });

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // Lógica para el filtrado de productos...
        const categoryFilter = document.getElementById('categoryFilter');
        const productList = document.getElementById('productList');

        categoryFilter.addEventListener('change', (event) => {
            const selectedTipo = event.target.value;

            [...productList.children].forEach(product => {
                const productTipo = product.getAttribute('data-tipo');

                if (selectedTipo === 'all' || productTipo === selectedTipo) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
}
