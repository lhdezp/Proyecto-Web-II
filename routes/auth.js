const { Router } = require('express');
const { login } = require('../controllers/auth.js');
const ErrorValidator = require('../middlewares/errorvalidator.js').getErrorInstance();

const router = Router();

router.post('/login', ErrorValidator.secureAsync(login));

module.exports = router;