import appInit from './App';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
dotenv.config();
const port = process.env.PORT;

appInit().then((app) => {
    if(process.env.NODE_ENV === 'development') {
        const options = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'StudentsIO backend API',
                    version: '1.0.0',
                    description: 'list of all the routes',
                },
                servers: [
                    {
                        url: 'http://localhost:'+process.env.PORT,
                    },
                ],
            },
            apis: ['./src/routes/*.ts'],
        };
        const specs = swaggerJsDoc(options);
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    }
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
});


