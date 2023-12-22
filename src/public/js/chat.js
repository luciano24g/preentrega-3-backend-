const socket = io();

document.getElementById('chatForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('user').value;
    const message = document.getElementById('message').value;

    socket.emit('chatMessage', { user, message });
    document.getElementById('message').value = '';
});

socket.on('chatMessages-update', (messages) => {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';
    messages.forEach(msg => {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${msg.user}</strong>: ${msg.message}`;
        chatMessages.appendChild(p);
    });
});