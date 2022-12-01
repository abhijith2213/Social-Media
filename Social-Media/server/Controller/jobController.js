const Job = require("../Models/jobSchema");
const User = require("../Models/userSchema");

/* ------------------------------ ADD NEW WORK ------------------------------ */

const PostAddWork = async (req,res)=>{
    console.log(req.body,'fghjk');
    console.log('reached works');
    const {data,userId} = req.body
    console.log(data,userId,'lllllll');
    const datas = new Job({...data,userId:userId})
    try {
        await datas.save()
        res.status(200).json({message:'New Job added'})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

/* ------------------------------ GET OWN WORKS ----------------------------- */

const getMyPosts = async (req,res)=>{
    console.log(req.params.id);
    try {
       const posts = await Job.find({userId:req.params.id,work:'open'})
       res.status(200).json(posts)
    } catch (error) {
        res.json(500).json(error)
    }
}

/* --------------------------- GET ASSIGNED POSTS --------------------------- */

const getAssignedPosts = async (req,res)=>{

    try {
        const posts = await Job.find({userId:req.params.id,work:{$ne:'open'}}).populate('work','userName')
        res.status(200).json(posts)
    } catch (error) {
        res.json(500).json(error)
    }
}
/* --------------------------- GET TIMELINE WORKS --------------------------- */

const getAllPosts = async (req,res)=>{
    console.log(req.params.id);
    try {
        const user = await User.findById(req.params.id)
        const posts = await Promise.all(user?.following?.map(async(id)=>{
            return  Job.find({userId:id,work:'open'}).populate('userId','userName fullName')
           
        }))
        const result = posts?.filter((post)=>{
            return post.length != 0
        })
        console.log(result,'nnnpostsss');
        res.status(200).json(...result)
    } catch (error) {
       console.log(error);
       res.status(500).json(error) 
    }
}

/* ------------------------------ DELETE WORKS ------------------------------ */

const deleteJob = async (req,res)=>{
try {
    await Job.findByIdAndDelete(req.params.id)
    res.status(200).json({message:'Job Removed!'})
} catch (error) {
    res.json(500).json(error)
}
}

/* ---------------------------- SEND JOB REQUESTS --------------------------- */

const sendJobRequest = async (req,res)=>{
    console.log(req.params.id);
    console.log(req.body);
    try {
        const job = await Job.findByIdAndUpdate(req.params.id,
            {$push:{requests:req.body.userId}})
            console.log(job,'oo');
            res.status(200).json({message:'Request Send Successfully'})

    } catch (error) {
        console.log(error);
       res.status(500).json(error) 
    }
}

/* ----------------------------- FETCH REQUESTED WORKS ----------------------------- */

const getRequests = async (req,res)=>{
    console.log(req.params.id);
    try {
       const jobs = await Job.find({userId:req.params.id,requests:{$exists:true,$ne:[]}})
       console.log(jobs,'mko');
       res.status(200).json(jobs)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

/* ------------------------ FETCH REQUESTED USERDATA ----------------------- */

const getRequestUsers =async(req,res)=>{
    console.log(req.params.id);
    try {
        const data = await Job.findById(req.params.id).populate('requests','userName fullName')
        console.log(data,'dataaa');
        res.status(200).json(data.requests)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

/* --------------------------- ASSIGN WORK TO USER -------------------------- */

const assignWork =async (req,res)=>{
    const {userId} = req.body;
    console.log(userId,'lll');
    console.log(req.params.id);

    try {
        await Job.findByIdAndUpdate(req.params.id,
            {$set:{work:userId,requests:[]}})
            res.status(200).json({message:'Work assigned Successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }
}

module.exports = {PostAddWork, getMyPosts,getAssignedPosts,getAllPosts,deleteJob,sendJobRequest,getRequests,
                  getRequestUsers,assignWork}