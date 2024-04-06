const mongoose = require('mongoose');

const myReviewSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    //user who gave specific user's review
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    //specific user itself
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps : true //for updating updated at and created at
});

const MyReview = mongoose.model('MyReview', myReviewSchema);

module.exports = MyReview;