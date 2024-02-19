const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT;

mongoose.connect(process.env.DB_CONNECT);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const studentRoute = require('./routes/student-route');
const postRoute = require('./routes/post-route');

app.use('/students', studentRoute);

app.use('/post', postRoute)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});