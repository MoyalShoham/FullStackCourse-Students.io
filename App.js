const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

const port = process.env.PORT;

const studentRoute = require('./routes/student-route');

app.use('/student', studentRoute);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});