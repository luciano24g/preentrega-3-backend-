import supertest from 'supertest';
import { app } from '../src/app.js';
import { expect } from 'chai';
import productModel from '../src/dao/models/products.model.js';
import cartsModel from '../src/dao/models/carts.model.js';
import userModel from '../src/dao/models/Users.models.js';
import { generateToken } from '../src/utils.js';

const requester = supertest(app);

describe("Testing para los servicios de productos", () => {
    beforeEach(async () => {
        await productModel.deleteMany({});
    });

    it("POST /products/testing debería crear un producto correctamente", async () => {
        const productMock = {
            title: "Zapatillas Nike Air Max",
            description: "Zapatillas deportivas de la marca Nike, modelo Air Max, ideales para correr.",
            price: 15000,
            thumbnail: "air_max.jpg",
            code: "NIKE123",
            stock: 100,
            category: "Zapatillas",
            owner: "admin@example.com"
        };

        const response = await requester.post("/products/testing").send(productMock);

        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal("success");
    });

    it("GET /products debería devolver una lista de productos", async () => {
        const response = await requester.get("/products");

        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal("success");
        expect(response.body.productos).to.be.an("array");
    });

    it("DELETE /products/:id debería eliminar un producto por su ID", async () => {
        const productMock = {
            title: "Camiseta Nike Dry Fit",
            description: "Camiseta deportiva de la marca Nike, tecnología Dry Fit, ideal para entrenamientos.",
            price: 5000,
            thumbnail: "dry_fit.jpg",
            code: "NIKE456",
            stock: 50,
            category: "Camisetas",
            owner: "admin@example.com"
        };

        const createdProduct = await productModel.create(productMock);

        const response = await requester.delete(`/products/${createdProduct._id}`);

        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal("success");
    });
});

describe("Testing para los servicios de carritos", () => {
    beforeEach(async () => {
        await cartsModel.deleteMany({});
    });

    it("POST /api/carts debería crear un carrito correctamente", async () => {
        const response = await requester.post("/api/carts/");

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("_id");
    });

    it("GET /api/carts/:id debería obtener un carrito por su ID", async () => {
        const createdCart = await cartsModel.create({});

        const response = await requester.get(`/api/carts/${createdCart._id}`);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("_id");
    });

    it("POST /api/carts/:id/product/:pid debería agregar un producto al carrito", async () => {
        const productMock = {
            title: "Medias Nike Performance",
            description: "Medias deportivas de la marca Nike, diseño Performance, ideales para running.",
            price: 1000,
            thumbnail: "performance.jpg",
            code: "NIKE789",
            stock: 30,
            category: "Medias",
            owner: "admin@example.com"
        };

        const createdProduct = await productModel.create(productMock);
        const createdCart = await cartsModel.create({});

        const response = await requester.post(`/api/carts/${createdCart._id}/product/${createdProduct._id}`);

        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal("success");
    });
});

describe("Testing para los servicios de sesiones", () => {
    beforeEach(async () => {
        await userModel.deleteMany({});
    });

    it("POST /api/sessions/register debería realizar un registro de usuario", async () => {
        const userMock = {
            first_name: "Juan",
            last_name: "Pérez",
            email: "juan@example.com",
            age: 25,
            password: "contraseña123",
            role: "user",
            cart: []
        };

        const response = await requester.post("/api/sessions/register").send(userMock);

        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal("success");
    });

    it("POST /api/sessions/login debería autenticar al usuario", async () => {
        const userMock = {
            email: "juan@example.com",
            password: "contraseña123"
        };

        const response = await requester.post("/api/sessions/login").send(userMock);

        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal("success");
        expect(response.body).to.have.property("token");
    });

    it("GET /api/sessions/current debería obtener la información del usuario autenticado", async () => {
        const userMock = {
            email: "juan@example.com",
            password: "contraseña123"
        };

        const loginResponse = await requester.post("/api/sessions/login").send(userMock);
        const token = loginResponse.body.token;

        const response = await requester.get("/api/sessions/current")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal("success");
        expect(response.body.payload.email).to.equal("juan@example.com");
    });
});
