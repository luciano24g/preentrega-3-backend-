// En realTimeIndex.js (o cualquier script específico para tiempo real)
const socket = io();

// Escuchador para actualizar la lista de productos en tiempo real
socket.on('actualizarLista', (productosActualizados) => {
  // Actualiza la interfaz de usuario con la nueva lista de productos
  console.log('Lista de productos actualizada:', productosActualizados);

  // Obtén la lista de productos en tu vista
  const productList = document.getElementById('productList');


  productList.innerHTML = '';

  // Itera sobre la nueva lista de productos y crea elementos para cada uno
  productosActualizados.forEach((producto) => {
    // Crea un elemento de lista
    const listItem = document.createElement('li');

    listItem.innerHTML = `
      <img src="${producto.thumbnail}" alt="${producto.title}">
      <p>ID: ${producto.id}</p>
      <p>Title: ${producto.title}</p>
      <p>Description: ${producto.description}</p>
      <p>Price: $${producto.price}</p>
      <p>Stock: ${producto.stock}</p>
    `;

    productList.appendChild(listItem);
  });
});
