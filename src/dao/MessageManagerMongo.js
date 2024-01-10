const Message = require('../dao/models/Message.js');  // Asegúrate de que la ruta sea correcta



class MessageManagerMongo {
  constructor() {
    // No necesitas un modelo aquí, ya que lo pasaremos directamente cuando creemos una instancia de esta clase.
  }

  async getAll() {
    return await Message.find();
  }

  async getById(id) {
    return await Message.findById(id);
  }

  async create(data) {
    const newMessage = new Message({ 
        user: data.user, 
        message: data.message 
    });
    await newMessage.save();
    return newMessage;
}
  async update(id, data) {
    const updatedMessage = await Message.findByIdAndUpdate(id, data, { new: true });
    if (!updatedMessage) {
      throw new Error('Message not found');
    }
    return updatedMessage;
  }

  async delete(id) {
    const deletedMessage = await Message.findByIdAndDelete(id);
    if (!deletedMessage) {
      throw new Error('Message not found');
    }
    return deletedMessage;
  }
}

module.exports = MessageManagerMongo;
