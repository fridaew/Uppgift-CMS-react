const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 8888;
const SERVER_URI = 'http://localhost:' + PORT

app.listen(PORT, () => console.log('Server running on ' + SERVER_URI));
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err))