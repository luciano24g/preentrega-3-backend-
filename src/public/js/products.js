
// Evento que se ejecuta cuando el documento HTML ha sido completamente cargado
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
