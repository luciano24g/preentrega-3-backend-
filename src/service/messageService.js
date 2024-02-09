// messageService.js

import MessageManagerMongo from '../managers/MessageManagerMongo.js';

const messageManager = new MessageManagerMongo();

export const getAllMessages = async () => {
    try {
        return await messageManager.getAll();
    } catch (error) {
        throw error;
    }
};

export const getMessageById = async (id) => {
    try {
        return await messageManager.getById(id);
    } catch (error) {
        throw error;
    }
};

export const createMessage = async (data) => {
    try {
        return await messageManager.create(data);
    } catch (error) {
        throw error;
    }
};

export const updateMessage = async (id, data) => {
    try {
        return await messageManager.update(id, data);
    } catch (error) {
        throw error;
    }
};

export const deleteMessage = async (id) => {
    try {
        return await messageManager.delete(id);
    } catch (error) {
        throw error;
    }
};
