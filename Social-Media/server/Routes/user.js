const express = require('express')
const router = express.Router()
const upload = require('../config/multerConfig')
const verifyJWT = require('../Middlewares/verifyJWT')


//************* */ USER CONTROLLER 
const {postCreateAccount, postSignIn, getSuggestions,putFollowUser, getPostUser,
       putUnfollowUser,getUserDetails,getUserData,getMyFollowers,getMyFollowings,
       updateUserProfile,updateProfilePic,searchUsers,updateCoverPic,getNotifications,
       verifyOtp,sendUserOtp,changeUserPassword} = require('../Controller/userController')

//************** */ POST CONTROLLER 
const {postUpload,getTimelinePost,putLikePost,putPostComment,getViewComments,
       getUserPosts,deletePost,reportPost,getReportData,getPostArchieves} = require('../Controller/postController')


/* --------------------------------- ROUTES ------------------------------------ */

router.post('/create_account',postCreateAccount)


router.post('/signin',postSignIn)


router.post('/uploadPost',upload.single('file'),postUpload)


router.get('/post/timeline_post/:id',verifyJWT,getTimelinePost)


router.get('/postDetails/:id',getPostUser)


router.get('/suggestions/:id',verifyJWT,getSuggestions)


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


router.put('/user/updateProfile/:id',updateUserProfile)


router.put('/user/update/profilePic',upload.single('file'),updateProfilePic)


router.get('/user/search/:id',searchUsers)


router.put(`/user/update/coverPic`,upload.single('file'),updateCoverPic)


router.get('/user/notification/:id',getNotifications)

router.post('/signup/sendOtp',sendUserOtp)

router.post('/singnUp/otp/verify',verifyOtp)

router.put('/user/editProfile/changePassword/:id',changeUserPassword)

module.exports = router