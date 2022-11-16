const express = require('express')
const router = express.Router()
const upload = require('../config/multerConfig')
const {postCreateAccount, postSignIn, postAddNewPost, getSuggestions,
        putFollowUser, postImageUpload, getTimelinePost, getPostUser, putLikePost} = require('../Controller/userController')



/* --------------------------------- ROUTES --------------------------------- */

router.post('/create_account',postCreateAccount)

router.post('/signin',postSignIn)


router.post('/add_new_post',postAddNewPost)

router.post('/uploadImage',upload.single('file'),postImageUpload)

router.get('/post/timeline_post/:id',getTimelinePost)

router.get('/postDetails/:id',getPostUser)


router.get('/suggestions/:id',getSuggestions)

router.put('/:id/follow',putFollowUser)

router.put('/post/like/:id',putLikePost)









module.exports = router