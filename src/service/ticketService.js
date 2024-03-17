// ticketService.js

import Ticket from '../models/ticketModel.js';

const createTicket = async (ticketData) => {
  try {
    return await Ticket.create(ticketData);
  } catch (error) {
    throw error;
  }
};

export default { createTicket };
