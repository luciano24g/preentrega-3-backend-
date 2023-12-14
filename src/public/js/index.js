// En index.js (o cualquier otro script que no sea en tiempo real)
const socket = io();

// Ejemplo: Escuchador para eventos no relacionados con tiempo real
socket.on('eventoEjemplo', (data) => {
  console.log('Evento recibido:', data);
  // Lógica adicional si es necesario
});
