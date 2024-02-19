import appInit from './App';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT;

appInit().then((app) => {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
});


