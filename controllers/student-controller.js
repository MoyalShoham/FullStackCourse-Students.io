const Student = require('../models/student-model');

const getStudents = async (req, res) => {
    let students;
    try {
        if (req.query.age) {
            students = await Student.find({age: req.query.age});
        } else if (req.query.name) {
            students = await Student.find({name: req.query.name});
        } else {
            students = await Student.find();
        }
    } catch (error) {
        res.status(404).json({error: error.message});
    }
    res.status(200).json(students);
};
const getStudentById = async (req, res) => {
    console.log(req.params);
    try {
        const student = await Student.findById(req.params.id);
        res.status(200).send(student);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const postStudents = async (req, res) => {
    // res.send('Post Student!' + req.body);
    try{
        const student = await Student.create(req.body);
        res.status(201).send(student);
    } catch (error) {
        res.status(400).send(error.message);
    }

};

// update student with the given id
const putStudents = async (req, res) => {
    let student;
    try {
        student = await Student.findByIdAndUpdate(req.params.id, req.body);
    } catch (error) {
        res.status(400).send(error.message);    
    }

    res.status(200).send(student);
};
const deleteStudents = async (req, res) => {
    let student;
    try {
        student = await Student.findByIdAndDelete(req.params.id);
    } catch (error) {
        res.status(400).send(error.message);
    }
    res.status(200).send(student);
    
};



module.exports = {
    getStudents,
    getStudentById,
    postStudents,
    putStudents,
    deleteStudents
};
