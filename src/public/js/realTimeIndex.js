// En realTimeIndex.js (o cualquier script específico para tiempo real)
const socket = io();

// Escuchador para actualizar la lista de productos en tiempo real
socket.on('actualizarLista', (productosActualizados) => {
  // Actualiza la interfaz de usuario con la nueva lista de productos
  console.log('Lista de productos actualizada:', productosActualizados);

  // Obtén la lista de productos en tu vista
  const productList = document.getElementById('productList');

  // Limpia el contenido existente en la lista
  productList.innerHTML = '';

  // Itera sobre la nueva lista de productos y crea elementos para cada uno
  productosActualizados.forEach((producto) => {
    // Crea un elemento de lista
    const listItem = document.createElement('li');

    // Agrega HTML al elemento de lista con la información del producto
    listItem.innerHTML = `
      <img src="${producto.thumbnail}" alt="${producto.title}">
      <p>ID: ${producto.id}</p>
      <p>Title: ${producto.title}</p>
      <p>Description: ${producto.description}</p>
      <p>Price: $${producto.price}</p>
      <p>Stock: ${producto.stock}</p>
    `;

    // Agrega el elemento del producto a la lista
    productList.appendChild(listItem);
  });
});
