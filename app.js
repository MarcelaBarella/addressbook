const express = require('express');
const app = express();
const database = require('./config/auth');
require('dotenv').config();

app.use(express.json());
const contactsRoute = require('./routes/contacts');
const authRoute = require('./routes/auth');

app.use('/contacts', contactsRoute);
app.use('/auth', authRoute);

async function main() {
    await database.sync();
    app.listen(process.env.PORT);
}

main();