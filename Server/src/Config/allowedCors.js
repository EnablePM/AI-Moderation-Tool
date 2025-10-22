const allowedCors = [
    'http://localhost:3000', 
    'http://localhost:5173',
    process.env.FRONTEND_URL, // Production frontend URL
].filter(Boolean); // Remove undefined values

module.exports = allowedCors;