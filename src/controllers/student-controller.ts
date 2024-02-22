import Post, { IPost } from '../models/post-model';
import Student, { IStudent } from '../models/student-model';
import BaseController from './base-controller';
import { Request, Response } from 'express';


// const studentController = new BaseController<IStudent>(Student);


class StudentController extends BaseController<IStudent> {
    constructor() {
        super(Student);
    }
    async getById(req: Request, res: Response) {
        let student: IStudent;
       
        try {
            // console.log('student get by id');
            student = await this.itemModel.findById(req.params.id);
            if (!student) {
                return res.status(404).send('not found');
            } else {
                res.status(200).send(student);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
        
    }

    async getPostsByStudent(req: Request, res: Response) {
        // let student: IStudent;
        let posts: IPost[];
        try {
            console.log(`get posts by student id: ${req.params.id}`);
            posts = await Post.find({ owner: req.params.id });
            res.status(200).send(posts);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

}

export default new StudentController();
