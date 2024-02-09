// messageController.js

import * as MessageService from '../service/messageService.js';

export const getAllMessages = async (req, res, next) => {
    try {
        const messages = await MessageService.getAllMessages();
        res.status(200).json({ status: "success", messages });
    } catch (error) {
        console.error('Error al obtener todos los mensajes:', error.message);
        res.status(500).json({ status: "error", message: "Error al obtener todos los mensajes" });
    }
};

export const getMessageById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const message = await MessageService.getMessageById(id);
        res.status(200).json({ status: "success", message });
    } catch (error) {
        console.error(`Error al obtener mensaje con ID ${id}:`, error.message);
        res.status(500).json({ status: "error", message: `Error al obtener mensaje con ID ${id}` });
    }
};

export const createMessage = async (req, res, next) => {
    const data = req.body;
    try {
        const newMessage = await MessageService.createMessage(data);
        res.status(201).json({ status: "success", message: "Mensaje creado con éxito", newMessage });
    } catch (error) {
        console.error('Error al crear el mensaje:', error.message);
        res.status(500).json({ status: "error", message: "Error al crear el mensaje" });
    }
};

export const updateMessage = async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const updatedMessage = await MessageService.updateMessage(id, data);
        res.status(200).json({ status: "success", message: "Mensaje actualizado con éxito", updatedMessage });
    } catch (error) {
        console.error(`Error al actualizar el mensaje con ID ${id}:`, error.message);
        res.status(500).json({ status: "error", message: `Error al actualizar el mensaje con ID ${id}` });
    }
};

export const deleteMessage = async (req, res, next) => {
    const id = req.params.id;
    try {
        await MessageService.deleteMessage(id);
        res.status(200).json({ status: "success", message: "Mensaje eliminado con éxito" });
    } catch (error) {
        console.error(`Error al eliminar el mensaje con ID ${id}:`, error.message);
        res.status(500).json({ status: "error", message: `Error al eliminar el mensaje con ID ${id}` });
    }
};
