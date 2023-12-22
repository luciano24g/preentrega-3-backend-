const Message = require('../dao/models/Message'); // Asegúrate de que la ruta sea correcta según tu estructura

class MessageManagerMongo {
  async getMessages() {
    try {
      const messages = await Message.find();
      return messages;
    } catch (error) {
      console.error('Error al obtener mensajes:', error.message);
      return [];
    }
  }

  async addMessage(user, messageContent) {
    try {
      const newMessage = new Message({
        user: user,
        message: messageContent
      });
      await newMessage.save();
      return newMessage;
    } catch (error) {
      console.error('Error al guardar el mensaje:', error.message);
      return null;
    }
  }

  // Otros métodos relacionados con mensajes en MongoDB, como actualizar, eliminar, etc.
}

module.exports = new MessageManagerMongo();
