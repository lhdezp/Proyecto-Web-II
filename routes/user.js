const express = require('express');
const router = express.Router();

const { getUser, createUser, updateUser, deleteUser } = require("../controllers/user.js");

// Get a User
router.get('/:name', getUser);

// Create a new User
router.post('/', createUser);

// Update an existing User by name
router.put('/:name', updateUser);

// Delete a User by name
router.delete('/:name', deleteUser);

module.exports = router;
