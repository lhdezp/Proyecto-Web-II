const { PrismaClient } = require('@prisma/client');
const { generateJWT } = require('../helpers/Authorization.js');

// Initialize Prisma Client
const prisma = new PrismaClient();

async function login(req, res) {
    const { name, password } = req.body;
    try {
        const user = await prisma.users.findUnique({ where: { name } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        } 
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const token = await generateJWT(user.name);
        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
}

module.exports = { login };
