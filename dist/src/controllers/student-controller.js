"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_model_1 = __importDefault(require("../models/student-model"));
const base_controller_1 = __importDefault(require("./base-controller"));
const studentController = new base_controller_1.default(student_model_1.default);
exports.default = studentController;
//# sourceMappingURL=student-controller.js.map