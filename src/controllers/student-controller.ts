import Student, { IStudent } from '../models/student-model';
import BaseController from './base-controller';


const studentController = new BaseController<IStudent>(Student);


export default studentController;
