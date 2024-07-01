
const logger = function (req, res, next) {
    console.log(`MiddleWare Global`, `User IP: ${req.ip} `, `Request Type: ${req.method}`);
    next();
}
module.exports = logger;