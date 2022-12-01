const express = require('express')
const router = express.Router()
const upload = require('../config/multerConfig')


//************* */ USER CONTROLLER 
const {postCreateAccount, postSignIn, getSuggestions,putFollowUser, getPostUser,
       putUnfollowUser,getUserDetails,getUserData,getMyFollowers,getMyFollowings} = require('../Controller/userController')

//************** */ POST CONTROLLER 
const {postUpload,getTimelinePost,putLikePost,putPostComment,getViewComments,
       getUserPosts,deletePost,reportPost,getReportData,getPostArchieves} = require('../Controller/postController')


/* --------------------------------- ROUTES ------------------------------------ */

router.post('/create_account',postCreateAccount)


router.post('/signin',postSignIn)


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

router.get('/profile/myposts/archieves/:id',getPostArchieves)


router.get('/users/:userId',getUserDetails)


router.get('/:id',getUserData)

router.delete('/post/delete/:id',deletePost)


router.put('/post/report/:id',reportPost)

router.get('/user/myFollowers/:id',getMyFollowers)


router.get('/user/myFollowing/:id',getMyFollowings)


router.get('/admin/post/reportDetails/:id',getReportData)


module.exports = router