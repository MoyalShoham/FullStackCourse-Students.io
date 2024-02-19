const Student = require('../models/student-model');

const getStudents = (req, res) => {
    res.send('Get Students!');
};
const getStudentById = (req, res) => {
    console.log(req.params);
    res.send('Get Student by ID!');
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
const putStudents = (req, res) => {
    res.send('Put Student!');
};
const deleteStudents = (req, res) => {
    res.send('Delete Student!');
};

module.exports = {
    getStudents,
    getStudentById,
    postStudents,
    putStudents,
    deleteStudents
};
