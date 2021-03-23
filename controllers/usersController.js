const bcrypt = require('bcryptjs');
const Users = require('../models/Users')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const authCheck = require('../middleware/authCheck')

exports.register = (req, res) => {
    const user = new Users(req.body)
    console.log(user)
    let errors = []

    registerValidation = () => {
        return new Promise( async (resolve, reject) => {
            // register validation
            if (user.email == '' && user.password == '') {
                errors.push('Please fill all fields')
                reject('Please fill all fields')
                return
            }
            if (user.email == '') {
                errors.push('Please enter an email')
                reject()
            }
            if (user.password == '') {
                errors.push('Please enter a password')
                reject()
            }
            if (!validator.isEmail(user.email) && user.email != '') {
                errors.push('Please enter a valid email')
                reject()
            }
            if (validator.isEmail(user.email) && user.email != '') {
                let emailExists = await Users.findOne({email: user.email})
                if (emailExists) {
                    errors.push('This mail has been used before')
                    reject()
                }
            }
            resolve()
        })
    }
    registerValidation().then( async () => {
        if (!errors.length) {
            let salt = bcrypt.genSaltSync(10)
            user.password = bcrypt.hashSync(user.password, salt)
            await user.save()
            res.json({status: 'sucsses', message: 'Account created'})
        }
    }).catch((e) => {
        res.json({message: errors})
    })    
}
exports.login = (req, res) => {
    const {email, password} = new Users(req.body)
    loginValidation = () => {
        return new Promise(async (resolve, reject) => {
            let emailExists = await Users.findOne({email: email});
            if (email == '' || password == '') {
                reject('Please fill all fields')
            }
            if (emailExists && bcrypt.compareSync(password , emailExists.password)) {
                const token = jwt.sign({
                    _id: emailExists._id,
                    name: emailExists.fullname,
                    email: emailExists.email,
                },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: 60 * 60 * 24 * 14,
                })
                emailExists.password = undefined
                resolve({status: 'sucsses', message: 'You have been logged in', token: token, userData: emailExists })
            } else if (emailExists) {
                reject('The password is incorrect')    
            }
             else {
                reject('Email not found')
            }
        })
    }
    loginValidation().then(data => {
        res.json(data)
        
    }).catch((err) => {
        res.json({message: err})
    })
}


exports.profile = async (req, res) => {
    const id = req.body.id
    await Users.findByIdAndUpdate(id, {
        email: req.body.email,
        fullname: req.body.fullName,
        birthDate: req.body.birthDate,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
        address: req.body.address,
        cvLayout: req.body.cvLayout,
        jobTitle: req.body.jobTitle,
        nationality: req.body.nationality,
        headerMessage: req.body.headerMessage,
        educations: req.body.educations,
        completeProfile: req.body.completeProfile,
        experiences: req.body.experiences,
        socialMedia: req.body.socialMedia,
    }, () => {
        res.json({
            status: 'done',
            userID: id,
            message: 'Profile updated'    
        })
    })
    
}
