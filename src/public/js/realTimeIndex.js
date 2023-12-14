// En realTimeIndex.js (o cualquier script específico para tiempo real)
const socket = io();

// Escuchador para actualizar la lista de productos en tiempo real
socket.on('actualizarLista', (productosActualizados) => {
  // Actualiza la interfaz de usuario con la nueva lista de productos
  console.log('Lista de productos actualizada:', productosActualizados);
  // Aquí deberías tener lógica para renderizar los productos en tu vista
});