const express = require('express')
const router = express.Router()
const {PostAddWork,getMyPosts,getAssignedPosts,getAllPosts, deleteJob, sendJobRequest,
        getRequests ,getRequestUsers,assignWork ,reportJob, assignedWorksToMe  } = require('../Controller/jobController')

router.post('/newWork',PostAddWork)

router.get('/myPosts/:id',getMyPosts)

router.get('/assignedPosts/:id',getAssignedPosts)

router.get('/allPosts/:id',getAllPosts)

router.delete('/delete/:id',deleteJob)

router.put('/sendRequest/:id',sendJobRequest)

router.get('/requests/:id',getRequests)


router.get('/requestDetails/:id',getRequestUsers)


router.put('/assignWork/:id',assignWork)

router.get('/assigneWorks/me/:id',assignedWorksToMe)

router.put('/reportWork/:id',reportJob)

 
module.exports= router