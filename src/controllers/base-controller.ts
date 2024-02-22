import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { IStudent } from '../models/student-model';

class BaseController<ModelType>{

    itemModel: mongoose.Model<ModelType>;
    constructor(itemModel: mongoose.Model<ModelType>) {
        this.itemModel = itemModel;
    }   


    async get(req: Request, res: Response){
        try {
            if (req.query.name) {
                const item = await this.itemModel.find({name: req.query.name});
                res.status(200).json(item);
            } else {
                const item = await this.itemModel.find();
                res.status(200).json(item);
            }
        } catch (error) {
            res.status(404).json({error: error.message});
        }
        
    }
    async getById( req: Request, res: Response) {
        let item: ModelType;
        try {
            if(this.itemModel === mongoose.Model<IStudent>){
                item = await this.itemModel.findById(req.params.id);
                console.log('student get by id');
            } else {
                item = await this.itemModel.findById(req.params.owner);
                console.log('post get by owner');
            }
            
            if (!item) {
                return res.status(404).send('not found');
            } else {
                res.status(200).send(item);
            }
        } catch (error) {
            res.status(400).send(item);
        }
    }
    async post (req: Request, res: Response) {
        // res.send('Post Student!' + req.body);
        try{
            const item = await this.itemModel.create(req.body);
            res.status(201).send(item);
        } catch (error) {
            res.status(400).send(error.message);
        }
    
    }
    async put ( req: Request, res: Response) {
        try {
            const item = await this.itemModel.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).send(item._id);
        } catch (error) {
            res.status(400).send(error.message);    
        }
    }
    async remove ( req: Request, res: Response) {
        try{
            await this.itemModel.findByIdAndDelete(req.params.id);
            res.status(200).send();
        } catch (error) {
            res.status(400).send(error.message);
        }
        
    }
}

export default BaseController;

