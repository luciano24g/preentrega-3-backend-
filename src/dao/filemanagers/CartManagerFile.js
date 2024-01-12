const fs = require("fs").promises;
const path = require("path");
const { __dirname } = require("../utils.js");

class CartManagerFile {
    constructor(pathFile) {
        this.path = path.join(__dirname, `/files/${pathFile}`);
    }

    getCarts = async () => {
        if (await fs.exists(this.path)) {
            const data = await fs.readFile(this.path, 'utf-8');
            const carts = JSON.parse(data);
            return carts;
        } else {
            return [];
        }
    };
}

module.exports = { CartManagerFile };
