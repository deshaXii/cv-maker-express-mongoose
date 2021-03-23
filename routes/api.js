const express = require('express');
const usersController = require('../controllers/usersController')
const Users = require('../models/Users')
const authCheck = require('../middleware/authCheck')


const router = express.Router();

router.post('/register', usersController.register);

router.post('/login', usersController.login);

router.post('/profile', authCheck.authenticateJWT, usersController.profile);



router.get('/me', authCheck.authenticateJWT, (req, res) => {
  res.json(req.user)
})


router.get('/users/:userId', async (req, res) => {
  let id = req.params.userId
    await Users.findById(id, (err, result) => {
      res.send(result)
    });
})


router.get('/users', (req, res) => {
  Users.find((err, result) => {
    res.send(result)
  });
})

module.exports = router;
