const getStudents = (req, res) => {
    res.send('Get Student!');
};
const postStudents = (req, res) => {
    res.send('Post Student!');
};
const putStudents = (req, res) => {
    res.send('Put Student!');
};
const deleteStudents = (req, res) => {
    res.send('Delete Student!');
};

module.exports = {
    getStudents,
    postStudents,
    putStudents,
    deleteStudents
};
