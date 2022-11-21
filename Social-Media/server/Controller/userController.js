const bcrypt = require('bcrypt');
const User = require('../Models/userSchema');
const jwt = require('jsonwebtoken');

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
                    const {phone,email,password,...details} = user._doc
                    const token = jwt.sign({id},process.env.JWT_SECRET,{expiresIn:300})
                    res.status(200).json({userToken:token,details,auth:true})
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

/* ------------------------------ UNFOLLOW USER ----------------------------- */

const putUnfollowUser =async (req,res)=>{
console.log(req.body,'pp');
console.log(req.params.id,'eeepp');
try {
    const user = await User.findById({_id:req.params.id})
    const userToUnfollow = await User.findById({_id:req.body.Id})
    if(user.following.includes(req.body.Id)){
     await user.updateOne({ $pull : {following: req.body.Id}});
     await userToUnfollow.updateOne({$pull : {followers: req.params.id}})
     res.status(200).json('UnFollowed')

    }else{
     res.status(403).json('You already unfollowed this user')
    }
 } catch (error) {
     res.status(500).json({message:'Something went wrong'})
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


module.exports ={postCreateAccount, postSignIn, getSuggestions,putFollowUser,getPostUser, putUnfollowUser}