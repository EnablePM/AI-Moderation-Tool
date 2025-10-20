const express = require('express');
const cors = require('cors');
const corsOptions = require('./src/Config/corsOptions.js');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors(corsOptions));


app.get('/', (req, res) => {
  res.send('Backend server is running');
});

const startServer = async () => {
 try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();