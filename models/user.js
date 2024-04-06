const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
       type : String,
       required : true,
       unique : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    permission: {
        type: String
    },
    //for storing reviews that are assigned to specific user
    assignedReviews:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AssignedReview',
    }
    ],
    //for storing reviews that are given to specific user by others
    myReviews:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MyReview',
    }
    ]
}, {
    timestamps : true //for updating updated at and created at
});

const User = mongoose.model('User', userSchema);

module.exports = User;