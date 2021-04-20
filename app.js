const express = require('express');
const app = express();

app.use(express.json());
const contactsRoute = require('./routes/api/contacts');