const bcrypt = require('bcrypt');
const User = require('../Models/userSchema');
const jwt = require('jsonwebtoken');
const Post = require('../Models/postSchema');

/* ----------------------------- CREATE ACCOUNT ----------------------------- */


const postCreateAccount = async (req,res)=>{
    try {       
        let {fullName,userName,email,phone,password,accountType}= req.body;

        const usedData = await User.findOne({$or:[{email},{userName},{phone}]})
        if(usedData){
            if(usedData.email === email){
                res.status(409).json("Email already Registered, Please Login")
            }else if(usedData.userName === userName){
                res.status(409).json("userName not Available")
            }else if(usedData.phone === phone){
                res.status(409).json("Phone number already registered, please Login!")
            }else {
                password = await bcrypt.hash(password,10)
                User.create({
                    fullName,
                    userName,
                    email,
                    phone,
                    password,
                    accountType,
                }).then((response)=>{
                    res.status(200).json(response._id)
                }).catch((error)=>{
                    res.status(503).json('Something went wrong')
                })
            }
        }else {
            password = await bcrypt.hash(password,10)
            User.create({
                fullName,
                userName,
                email,
                phone,
                password,
                accountType,
            }).then((response)=>{
                res.status(200).json(response._id)
            }).catch((error)=>{
                res.status(503).json('Something went wrong')
            })
        }
    } catch (error) {
        res.status(503).json('Something went wrong')
    }
}


/* --------------------------------- SIGNIN --------------------------------- */

const postSignIn = async (req,res)=>{
    try {
        let {email,password} = req.body
        const user = await User.findOne({email})
        if(user){

            const pass = await bcrypt.compare(password,user.password)
            if(pass){
                if(user.status === "active"){
                    const id = user._id
                    const token = jwt.sign({id},process.env.JWT_SECRET,{expiresIn:300})
                    res.status(200).json({userToken:token,user,auth:true})
                }else{
                    res.status(409).json({message:'Your account is blocked'})
                }
            }else{
                res.status(401).json({message:'Incorrect Password'})
            }
        } else{
            res.status(401).json({message:'User not Found!'})
        }
    } catch (error) {
       res.json('Something went wrong!, Please try again.')
    }
}


/* ---------------------------- SHOW SUGGESTIONS ---------------------------- */

const getSuggestions =async (req,res)=>{

    try {
        
        User.find().then((response)=>{
            res.status(200).json(response)
        }).catch((err)=>{
            res.status(500).json('Something went wrong')
        })

    } catch (error) {
        res.status(500).json({message:'Something went wrong!'})
    }
}


/* ------------------------------- FOLLOW USER ------------------------------ */

const putFollowUser = async (req,res)=>{
    try {
       const user = await User.findById({_id:req.params.id})
       const userToFollow = await User.findById({_id:req.body.Id})
       if(!user.following.includes(req.body.Id)){
        await user.updateOne({ $push : {following: req.body.Id}});
        await userToFollow.updateOne({$push : {followers: req.params.id}})
        res.status(200).json('Followed')

       }else{
        res.status(403).json('You already follows this user')
       }
    } catch (error) {
        res.status(500).json({message:'Something went wrong'})
    }
}

/* -------------------------- ADD POST DESCRIPTION -------------------------- */

const postAddNewPost =(req,res)=>{
    try {
        let {userId,description,image} = req.body
        Post.create({userId, description,image}).then((response)=>{
            res.status(200).json({message:'Post added successfully'})
        }).catch((err)=>{
            res.status(500).json({message:'Post Add failed'})
        })
    } catch (error) {
        res.status(500).json({message:'Something went wrong'})
    }
}


/* ------------------------------ IMAGE UPLOAD ------------------------------ */

const postImageUpload=(req,res)=>{
    console.log('helooo reacged img');
    try {
        res.status(200).json('image uploaded')
    } catch (error) {
        res.status(500).json('Something went wrong!')
    }
}

/* -------------------------------- GET TIMELINE POSTS ------------------------------- */

const getTimelinePost =async (req,res)=>{
    console.log('reached timeline post');
    console.log(req.params.id,'timeline post');
    try {
        console.log('juuu');
        const user = await User.findById(req.params.id)
        console.log(user,'timeline user');
        const feedPosts = await Promise.all(user.following.map((id)=>{
            return Post.find({userId:id}).sort({createdAt:-1})
        })
      )
      res.status(200).json(...feedPosts)

    } catch (error) {
        console.log('error');
        res.status(500).json('Something went wrong!')
    }
}

/* ------------------------- GET USERDETAILS OF POST ------------------------ */

const getPostUser =async (req,res)=>{
    console.log('user detailsss');
    const userId = req.query.userId
    try {
        
        const user = await User.findById(userId)
        console.log(user,'post user');

        const {password,created_date,status, ...others} = user._doc
        console.log(others,'pothers');
        res.status(200).json(others)


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

module.exports ={postCreateAccount, postSignIn, postAddNewPost, getSuggestions,putFollowUser,
     postImageUpload,getTimelinePost, getPostUser, putLikePost}