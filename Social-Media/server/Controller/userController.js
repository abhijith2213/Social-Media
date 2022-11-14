const bcrypt = require('bcrypt');
const User = require('../Models/userSchema');
const jwt = require('jsonwebtoken');
const Post = require('../Models/postSchema');


/* ----------------------------- CREATE ACCOUNT ----------------------------- */


const postCreateAccount = async (req,res)=>{
    console.log(req.body);
    try {       
        let {fullName,userName,email,phone,password,accountType}= req.body;

        const usedData = await User.findOne({$or:[{email},{userName},{phone}]})
        console.log(usedData,'its mail check');
        console.log(phone,'phoneeeeeeeeerg');
        console.log(typeof(phone));
        console.log(email,'emailllll');
        if(usedData){
            console.log(usedData.email,'jyugjdf');
            if(usedData.email === email){
                res.status(409).json("Email already Registered, Please Login")
            }else if(usedData.userName === userName){
                console.log(usedData.userName);
                res.status(409).json("userName not Available")
            }else if(usedData.phone === phone){
                console.log(usedData.phone);
                res.status(409).json("Phone number already registered, please Login!")
            }else {
                console.log('success');
                password = await bcrypt.hash(password,10)
                User.create({
                    fullName,
                    userName,
                    email,
                    phone,
                    password,
                    accountType,
                }).then((response)=>{
                    console.log(response);
                    res.status(200).json(response._id)
                }).catch((error)=>{
                    console.log(error.message,'something error');
                    res.status(503).json('Something went wrong')
                })
            }
        }else {
            console.log('success');
            password = await bcrypt.hash(password,10)
            User.create({
                fullName,
                userName,
                email,
                phone,
                password,
                accountType,
            }).then((response)=>{
                console.log(response);
                res.status(200).json(response._id)
            }).catch((error)=>{
                console.log(error.message,'something error');
                res.status(503).json('Something went wrong')
            })
        }
    } catch (error) {
        console.log(error.message,'oooo');
        res.status(503).json('Something went wrong')
    }
}


/* --------------------------------- SIGNIN --------------------------------- */

const postSignIn = async (req,res)=>{
    console.log(req.body,'oi');
    try {
        let {email,password} = req.body
        const user = await User.findOne({email})
        if(user){
            console.log('email ok');

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
                console.log('password wrong');
            }
        } else{
            res.status(401).json({message:'User not Found!'})
            console.log('no user');
        }
    } catch (error) {
       res.json('Something went wrong!, Please try again.')
        console.log('error');
    }
}


const postAddNewPost =(req,res)=>{
    console.log(req.body,'post body');
    try {
        let {userId,description} = req.body
        Post.create({userId, description}).then((response)=>{
            res.status(200).json({message:'Post added successfully'})
        }).catch((err)=>{
            res.status(500).json({message:'Post Add failed'})
        })
    } catch (error) {
        res.status(500).json({message:'Something went wrong'})
    }
}


module.exports ={postCreateAccount, postSignIn, postAddNewPost}