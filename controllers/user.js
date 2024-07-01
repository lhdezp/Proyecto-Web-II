const { PrismaClient } = require('@prisma/client');

// Initialize Prisma Client
const prisma = new PrismaClient();

const getUser = async (req, res) => {
    const { name } = req.params;
    try {
        const user = await prisma.users.findUnique({ where: { name } });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
};

const createUser = async (req, res) => {
    const { name, password } = req.body;
    try {
        const newUser = await prisma.users.create({
            data: {
                name,
                password,
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error creating user' });
    }
};

const updateUser = async (req, res) => {
    const { name } = req.params;
    const { password } = req.body;
    try {
        const updatedUser = await prisma.users.update({
            where: { name },
            data: {
                password,
            },
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
};

const deleteUser = async (req, res) => {
    const { name } = req.params;
    try {
        await prisma.users.delete({ where: { name } });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
};  

module.exports = { getUser, createUser, updateUser, deleteUser };
