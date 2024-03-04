import Student, { IStudent } from "../models/student-model";
import BaseController from "./base-controller";

class StudentController extends BaseController<IStudent> {
  constructor() {
    super(Student);
  }

}

export default new StudentController();