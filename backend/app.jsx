require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const { log } = require('console');

const port = process.env.PORT;

const app = express();
// Config JSON and Form Data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Solve Cors
app.use(cors({ credentials: true, origin: 'http://127.0.0.1:5173/' }));

// Upload directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// DB Connection
require('./config/db.jsx');

// Routes
const router = require('./routes/Router.jsx');

app.use(router);

app.listen(port, () => {
  log('Acess on http://localhost:' + port);
});
