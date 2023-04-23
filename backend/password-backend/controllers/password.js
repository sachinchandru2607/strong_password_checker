const Password = require('../models/password')


exports.getPasswords = ((req, res) => {
    const password = Password.find()
                            .then((list) => {
                                res.json({
                                    passwords : list
                                })
                            })
                            .catch((err) => console.log(err))
})

exports.storePassword = ((req, res) => {
    const password = new Password(req.body)
    password.save()
        .then((result) => {
            res.json({
                password : result
            })
        })
})