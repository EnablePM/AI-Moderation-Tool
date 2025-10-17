const allowedCors = require('./allowedCors');

const CorsOptions = {
    origin: allowedCors, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

module.exports = CorsOptions;