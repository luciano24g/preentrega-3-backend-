document.addEventListener('DOMContentLoaded', () => {
    const categoryFilter = document.getElementById('categoryFilter');
  
    // Event listener para el cambio de tipo
    categoryFilter.addEventListener('change', (event) => {
      const selectedTipo = event.target.value; 
      if (selectedTipo === 'all') {
          // Si se selecciona "Todos", simplemente redirige a la página de todos los productos
          window.location.href = '/products';
      } else {
        window.location.href = `/products/tipo/${selectedTipo}`;
      }
    });
  
    // No hay ninguna función de renderizado aquí, ya que no la necesitas.
  });
  