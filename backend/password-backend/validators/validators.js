const { check } = require('express-validator/check')

const storePasswordValidator = ((req, res, next) => {
    req.check('password', "Password is required").notEmpty()
    req.check('minsteps', "Minimum steps is required").notEmpty()

    const errors = req.validationErrors()
    if(errors) {
        return res.status(400).json({
            errors : errors
        })
    }
    next()
})

module.exports = {
    storePasswordValidator
}