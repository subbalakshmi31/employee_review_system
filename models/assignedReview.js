const mongoose = require('mongoose');

const assignedReviewSchema = new mongoose.Schema({
    //specific user itself
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    //to which user, specific user has to give review
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps : true //for updating updated at and created at
});

const AssignedReview = mongoose.model('AssignedReview', assignedReviewSchema);

module.exports = AssignedReview;