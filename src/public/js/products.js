// products.js
document.addEventListener('DOMContentLoaded', () => {
  const categoryFilter = document.getElementById('categoryFilter');
  const productList = document.getElementById('productList');

  // Event listener para el cambio de tipo
  categoryFilter.addEventListener('change', (event) => {
    const selectedTipo = event.target.value;

    // Iterar sobre los productos y mostrar/ocultar según el tipo seleccionado
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
