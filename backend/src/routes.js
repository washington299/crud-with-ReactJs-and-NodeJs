const express = require('express');
const UserController = require('./controllers/UserController');

const router = express.Router();

router.post('/users/add', UserController.store);
router.get('/users/edit/:id', UserController.show);
router.put('/users/edit/:id', UserController.update);
router.delete('/users/delete/:id', UserController.destroy);
router.get('/users', UserController.index);

module.exports = router;
