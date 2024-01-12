const fs = require("fs").promises;
const path = require("path");
const { __dirname } = require("../utils.js");

class ProductManagerFile {
    constructor(pathFile) {
        this.path = path.join(__dirname, `/files/${pathFile}`);
    }

    getProducts = async () => {
        if (await fs.exists(this.path)) {
            const data = await fs.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            return products;
        } else {
            return [];
        }
    };

    createProduct = async (product) => {
        const products = await this.getProducts();
        if (products.length === 0) {
            product.id = 1;
        } else {
            product.id = products[products.length - 1].id + 1;
        }

        products.push(product);
        await fs.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return products;
    };
}

module.exports = { ProductManagerFile };
