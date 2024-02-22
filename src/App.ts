import express, { Express } from 'express';
const app = express();

import dotenv from 'dotenv'
dotenv.config();
import studentRoute from './routes/student-route';
import postRoute  from './routes/post-route';

import mongoose from 'mongoose';
import bodyParser from 'body-parser';





const initApp =  () => {
    const promise = new Promise<Express>((resolve, reject) => {
        const db = mongoose.connection;
        db.on('error', (error) => console.error(error));
        db.once('open', () => console.log('Connected to Database'));

        try{
            mongoose.connect(process.env.DB_CONNECT).then(() => {
                app.use(bodyParser.json());
                app.use(bodyParser.urlencoded({ extended: true }));
                
                app.use('/students', studentRoute);
                app.use('/posts', postRoute);
                
                resolve(app);

            });
        } catch (error) {
            console.error(error);
            reject(error);
        }
    
    });
    return promise;

};





export default initApp;