const socket = io();

// Manipular la vista escuchando cambios en el socket
socket.on('product-list-update', (updatedProducts) => {
  // Actualizar la vista con la nueva lista de productos
  console.log('Product list updated:', updatedProducts);
  // Agrega lógica para actualizar la vista según tus necesidades
});