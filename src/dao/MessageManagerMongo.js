class MessageManagerMongo {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    return await this.model.find();
  }

  async getById(id) {
    return await this.model.findById(id);
  }

  async create(data) {
    const newItem = new this.model(data);
    await newItem.save();
    return newItem;
  }

  async update(id, data) {
    const updatedItem = await this.model.findByIdAndUpdate(id, data, { new: true });
    if (!updatedItem) {
      throw new Error('Message not found');
    }
    return updatedItem;
  }

  async delete(id) {
    const deletedItem = await this.model.findByIdAndDelete(id);
    if (!deletedItem) {
      throw new Error('Message not found');
    }
    return deletedItem;
  }
}

module.exports = MessageManagerMongo;
