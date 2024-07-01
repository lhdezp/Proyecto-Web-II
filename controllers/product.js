const { PrismaClient } = require('@prisma/client');

// Initialize Prisma Client
const prisma = new PrismaClient();

const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching products' });
    }
};

const getProduct = async (req, res) => {
    const { name } = req.params;
    try {
        const product = await prisma.product.findUnique({ where: { name } });
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
};

const createProduct = async (req, res) => {
    const { name, description, urlImage, price } = req.body;
    try {
        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                urlImage, 
                price,
            },
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error creating product' });
    }
};

const updateProduct = async (req, res) => {
    const { name } = req.params;
    const { description, urlImage, price } = req.body;
    try {
        const updatedProduct = await prisma.product.update({
            where: { name },
            data: {
                description,
                urlImage, // Asegúrate de que el nombre del campo coincida con el de tu esquema
                price,
            },
        });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
    }
};

const deleteProduct = async (req, res) => {
    const { name } = req.params;
    try {
        await prisma.product.delete({ where: { name } });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
};

module.exports = { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct };
