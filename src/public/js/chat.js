const socket = io();

// Evento para enviar mensajes desde el formulario
document.getElementById('chatForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = document.getElementById('user').value;
    const message = document.getElementById('message').value;

    // Emitir el mensaje a través de Socket.io para la actualización en tiempo real
    socket.emit('chatMessage', { user, message });

    // Enviar el mensaje al servidor para guardarlo en MongoDB
    try {
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user, message })
        });

        const data = await response.json();
        console.log('Mensaje guardado:', data);
    } catch (error) {
        console.error('Error al enviar el mensaje al servidor:', error);
    }

    // Limpiar el campo de mensaje después de enviarlo
    document.getElementById('message').value = '';
});

// Evento para recibir y mostrar mensajes actualizados desde el servidor
socket.on('chatMessages-update', (messages) => {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';

    messages.forEach(msg => {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${msg.user}</strong>: ${msg.message}`;
        chatMessages.appendChild(p);
    });
});
