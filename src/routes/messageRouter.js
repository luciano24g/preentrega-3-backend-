const express = require('express');
const MessageManagerMongo = require('../dao/MessageManagerMongo');  // Asegúrate de poner la ruta correcta aquí
const router = express.Router();
const messageManager = new MessageManagerMongo();

// Middleware para analizar el cuerpo de solicitudes JSON
router.use(express.json());

// Ruta para obtener todos los mensajes
router.get('/', async (req, res) => {
  try {
    const messages = await messageManager.getAll();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener un mensaje por su ID
router.get('/:id', async (req, res) => {
  try {
    const message = await messageManager.getById(req.params.id);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para crear un nuevo mensaje
router.post('/', async (req, res) => {
  try {
    const { user, message } = req.body;
    const data = { user, message }; // Asegúrate de que los nombres de las propiedades coincidan con los que estás enviando desde el frontend
    const newMessage = await messageManager.create(data);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un mensaje por su ID
router.put('/:id', async (req, res) => {
  try {
    const { user, messageText } = req.body;
    const data = { user, message: messageText };
    const updatedMessage = await messageManager.update(req.params.id, data);
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para eliminar un mensaje por su ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedMessage = await messageManager.delete(req.params.id);
    res.status(200).json(deletedMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
