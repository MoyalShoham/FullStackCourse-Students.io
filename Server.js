const appInit = require('./App');
const dotenv = require('dotenv').config();
const port = process.env.PORT;

appInit().then((app) => {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
});


