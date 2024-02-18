const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get Student!');
});

router.post('/', (req, res) => {
    res.send('Post Student!');
});

router.put('/', (req, res) => {
    res.send('Put Student!');
});

router.delete('/', (req, res) => {
    res.send('Delete Student!');
});

module.exports = router;