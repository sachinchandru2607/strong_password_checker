const express = require('express')
const router = express.Router()
const  { storePasswordValidator } = require('../validators/validators')
const { storePassword, getPasswords } = require('../controllers/password')

router.get('/getPasswords', getPasswords)

router.post('/storePassword', storePasswordValidator, storePassword)

module.exports = router