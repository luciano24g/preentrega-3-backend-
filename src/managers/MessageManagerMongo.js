// messageManagerMongo.js

import MessageModel from '../persistencia/Message.js';

class MessageManagerMongo {
    async getAll() {
        try {
            return await MessageModel.find();
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            return await MessageModel.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async create(data) {
        try {
            const newMessage = new MessageModel({ user: data.user, message: data.message });
            await newMessage.save();
            return newMessage;
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            const updatedMessage = await MessageModel.findByIdAndUpdate(id, data, { new: true });
            if (!updatedMessage) {
                throw new Error('Message not found');
            }
            return updatedMessage;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedMessage = await MessageModel.findByIdAndDelete(id);
            if (!deletedMessage) {
                throw new Error('Message not found');
            }
            return deletedMessage;
        } catch (error) {
            throw error;
        }
    }
}

export default MessageManagerMongo;
