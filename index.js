
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const productRouter = require('./routes/product.js');
const userRouter = require('./routes/user.js');
const loginRouter = require('./routes/auth');
const ErrorValidator = require('./middlewares/errorvalidator.js').getErrorInstance();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/auth', loginRouter);
app.use(ErrorValidator.errorResponder)


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
