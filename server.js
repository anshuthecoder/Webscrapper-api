const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const scrapeRoute = require('./routes/scrape');
require('dotenv').config();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGO_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(bodyParser.json());
app.use('/api', scrapeRoute);

app.get("/", async (req, res) => {
  res.status(200).send("<h1 style='text-align: center; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);'>Server is running</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
