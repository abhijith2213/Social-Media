const express = require('express')
const router = express.Router()
const {postCreateAccount, postSignIn, postAddNewPost} = require('../Controller/userController')



/* --------------------------------- ROUTES --------------------------------- */

router.post('/create_account',postCreateAccount)

router.post('/signin',postSignIn)


router.post('/add_new_post',postAddNewPost)









module.exports = router