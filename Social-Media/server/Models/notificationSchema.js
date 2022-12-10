const mongoose = require ('mongoose')

const NotificationSchema = new mongoose.Schema({

    userId:{
        type:String
    },
    Notifications:[{
       user: {
            type:String,
            ref:'users'
        },
        desc:{
            type:String,
        },
        time:{
            type:Date,
        }
        }]
})

const NotificationModel = mongoose.model('notifications',NotificationSchema)
module.exports = NotificationModel;