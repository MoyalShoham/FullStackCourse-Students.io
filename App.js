const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

const port = process.env.PORT;

const studentRoute = require('./routes/student-route');
const postRoute = require('./routes/post-route');

app.use('/student', studentRoute);
app.use('/post', postRoute)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});