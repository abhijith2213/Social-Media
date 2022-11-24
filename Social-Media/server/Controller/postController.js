const Post = require('../Models/postSchema');
const Comment = require('../Models/commentSchema')
const User = require('../Models/userSchema')

/* -------------------------- ADD POST DESCRIPTION -------------------------- */

// const postAddNewPost =(req,res)=>{
//     try {
//         let {userId,description,image} = req.body
//         Post.create({userId, description,image}).then((response)=>{
//             res.status(200).json({message:'Post added successfully'})
//         }).catch((err)=>{
//             res.status(500).json({message:'Post Add failed'})
//         })
//     } catch (error) {
//         res.status(500).json({message:'Something went wrong'})
//     }
// }


/* ------------------------------  UPLOAD NEW POST------------------------------ */

const postUpload=(req,res)=>{
    console.log('helooo reacged img');
    console.log(req.body,'image upload req body');
        let{userId,description}= req.body
        let image = req.file.filename
        console.log(image,userId,description,'dddddddddd');
        Post.create({userId,description,image}).then((response)=>{
            res.status(200).json({message:'Post added successfully'})
        }).catch((err)=>{
            res.status(500).json({message:'Post Add failed'})
        })
    }


/* -------------------------------- GET TIMELINE POSTS ------------------------------- */

const getTimelinePost =async (req,res)=>{
    console.log('reached timeline post');
    console.log(req.params.id,'timeline post');
    try {
        const user = await User.findById(req.params.id)
        const myPost = await Post.find({userId:req.params.id}).sort({createdAt:-1})
        const feedPosts = await Promise.all(user.following.map((id)=>{
            console.log(id,'jjjdddxxxcc');
            return Post.find({userId:id}).sort({createdAt:-1})
        })
      )
      console.log(myPost.concat(...feedPosts) ,'oijuhgcsdfgujhgbvsdxcv');
      res.status(200).json(myPost.concat(...feedPosts) )
    } catch (error) {
        res.status(500).json('Something went wrong!')
    }
}



/* -------------------------- POST LIKE MANAGEMENT -------------------------- */

const putLikePost = async (req,res)=>{
    console.log('calle reached');
    console.log(req.body);
    console.log(req.params.id);

    const post = await Post.findById(req.params.id)

    if(!post.likes.includes(req.body.userId)){
        await post.updateOne({$push:{likes:req.body.userId}})
        res.status(200).json({message:'post Liked'})
    }else{
        await post.updateOne({$pull:{likes:req.body.userId}})
        res.status(200).json({message:'post disliked!'})
    }

}

/* ------------------------- POST COMMENT MANAGEMENT ------------------------ */

const putPostComment = async (req,res)=>{

    console.log('reached comment');
    console.log(req.body,'body');
    console.log(req.params.id,'params id');
    try {
        const {userId,comment} = req.body
        const postId = req.params.id
          let response =  await  Comment.create({userId,comment,postId:postId})
          console.log(res,'opl');
          res.status(200).json({message:'comment added successfully'})
    } catch (error) {
        console.log(error.message,'error message comment');
        res.status(500).json({message:"Something went wrong"})
    }
}

/* --------------------------- VIEW POST COMMENTS --------------------------- */

const getViewComments = async(req,res)=>{
    console.log('in view comments');

    try {        
        let comments =await Comment.find({postId:req.params.id}).populate('userId','userName')
        console.log(comments,'ooopp');
        res.status(200).json(comments)

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:'Something went wrong'})
    }
}

/* ------------------------- VIEW USER POSTS PROFILE ------------------------ */

const getUserPosts = async (req,res)=>{
console.log(req.params.id,'opidd post');
    try {
      let posts = await Post.find({userId:req.params.id}).sort({createdAt:-1})
      console.log(posts,'my posts');
      res.status(200).json(posts)
    } catch (error) {
        
    }
}

module.exports = {postUpload,getTimelinePost,putLikePost,putPostComment,getViewComments,getUserPosts}
