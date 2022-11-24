const express = require('express')
const router = express.Router()
const upload = require('../config/multerConfig')


//************* */ USER CONTROLLER 
const {postCreateAccount, postSignIn, getSuggestions,putFollowUser, getPostUser,putUnfollowUser,getUserDetails} = require('../Controller/userController')

//************** */ POST CONTROLLER 
const {postUpload,getTimelinePost,putLikePost,putPostComment,getViewComments,getUserPosts} = require('../Controller/postController')


/* --------------------------------- ROUTES ------------------------------------ */

router.post('/create_account',postCreateAccount)


router.post('/signin',postSignIn)


// router.post('/add_new_post',postAddNewPost)


router.post('/uploadPost',upload.single('file'),postUpload)


router.get('/post/timeline_post/:id',getTimelinePost)


router.get('/postDetails/:id',getPostUser)


router.get('/suggestions/:id',getSuggestions)


router.put('/:id/follow',putFollowUser)

router.put('/:id/unfollow',putUnfollowUser)


router.put('/post/like/:id',putLikePost)


router.put('/post/comment/:id',putPostComment)


router.get('/post/viewComments/:id',getViewComments)

router.get('/profile/myposts/:id',getUserPosts)

router.get('/users/:userId',getUserDetails)







module.exports = router