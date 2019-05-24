const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../../middleware/check-auth');

router.get('/user', checkAuth, (req, res) => {


    User.findById(req.user.userId)
        .select('-password')
        .then(user => {
           
            res.status(201).json(user)

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
});

router.post('/signIn', (req, res) => {

    const Email = req.body.email;
    const Password = req.body.password;

    return User.findOne({ email: Email })
        .then(user => {

            if (user) {

                return bcrypt.compare(Password, user.password)
                    .then(handlePassword => {

                        if (handlePassword) {


                            const token = jwt.sign(
                                {
                                    name: user.name,
                                    email: user.email,
                                    userId: user._id
                                },
                                'jwtSecret',
                                { expiresIn: 3600 }
                            )

                            return res.status(200).json({
                                token: token,
                                msg: 'sucessful',
                                user: {

                                    id: user._id,
                                    name: user.name,
                                    email: user.email

                                }
                            })
                        }
                        return res.status(404).json({

                            msg: "Invalid Password, Please Enter Again"
                        })
                    })
            }
            return res.status(400).json({

                msg: 'Invalid Email .Please Enter Again!'

            })

        })
})
router.get('/', (req, res) => {


    User.find()
        .select('name email date password')
        .sort({ date: -1 })
        .then(users => {
            res.status(200).json({
                dataUsers: users
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })


        })
})
router.post('/signUp', (req, res) => {

    const Name = req.body.name;
    const Email = req.body.email;
    const Password = req.body.password;
    const Confirm = req.body.confirm;

    console.log(Name,Email,Password,Confirm);

    const namePattern = /[a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/; 
    const emailPattern = /^[a-zA-Z][-_.a-zA-Z0-9]{5,29}@g(oogle)?mail.com$/;
    const passwordPattern =/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;


    // Simple Validation 
    if (!Name || !Email || !Password || !Confirm) {

        return res.status(400).json({ msg: 'Please enter all fields' });

    }
    if(!namePattern.test(Name)){

        return res.status(400).json({ msg: 'The Name Not Match . Please Enter Again!'});
    }
    if(!emailPattern.test(Email)){

        return res.status(400).json({ msg: 'The Email You Just Entered is Not Valid!'});

    }
    if(!passwordPattern.test(Password)){

        return res.status(400).json({ msg: 'The Password Must to have Least One Uppercase And Number. Please Enter Again'});
    }    
    // Check for Existing User

    User.findOne({ email: Email })
        .then(user => {

            if (user) {

                return res.status(400).json({ msg: 'Email Already Exist' });
            }

            else {
               

                if(Password !== Confirm){


                    return res.status(400).json({ msg : 'The Confirm Not Match The Password. Please Enter Again!'})

                }
                return bcrypt.hash(Password, 12)
                    .then(handlePassword => {
                        if (handlePassword) {

                            const user = new User({
                                name: Name,
                                email: Email,
                                password: handlePassword
                            })
                            return user.save()
                                .then(() => {
                                    res.status(201).json({
                                        msg: "sucessful"
                                    })

                                })
                                .catch(err => {

                                    res.status(500).json({

                                        error: err

                                    })
                                })
                        }
                        return res.status(404).redirect('/SignUp');
                    })
                    .catch(err => {

                        res.status(500).json({

                            msg: err

                        })
                    })

            }
        })
})
module.exports = router






