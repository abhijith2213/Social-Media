const mongoose = require('mongoose')



const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const postSchema = mongoose.Schema({
    userId:{
        type: ObjectId,
        required:[true,'User Id not found']
    },
    description:{
        type:String,
        
    }
})

const Post = mongoose.model('posts',postSchema);
module.exports = Post