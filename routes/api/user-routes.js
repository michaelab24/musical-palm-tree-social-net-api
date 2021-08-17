const router = require('express').Router();
const { model } = require('mongoose');
const {
    getUsers
} = require('../../controllers/user-controller')

router.route('/').get(getUsers);

model.exports = router;