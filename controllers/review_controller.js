const User = require('../models/user');
const AssignedReview = require('../models/assignedReview');
const MyReview = require('../models/myReview')

//function to display all users in Assign Work tab
module.exports.home = async function(req, res){
    try {
        let users = await User.find({});
        res.render('assignWork', {
            users: users
        });
    } catch (err) {
        console.log('Error', err);
    }
}

//function to Assign review to Employee(will be done by user having admin role)
module.exports.createReview = async function(req, res){
    try {
        let review = await AssignedReview.findOne({ fromUser: req.body.reviewer, toUser: req.body.recipient });
        if (review) {
            req.flash('success', 'Review Already Assigned for same Recipient and Reviewer');
            return res.redirect('back');
        }else if(req.body.reviewer == req.body.recipient){
            req.flash('success', 'Recipient and Reviewer cannot be same');
            return res.redirect('back');
        }

        review = await AssignedReview.create({
            fromUser: req.body.reviewer,
            toUser: req.body.recipient
        });

        let user = await User.findById(req.body.reviewer);
        user.assignedReviews.push(review);
        user.save();
        req.flash('success', 'Review Assigned Successfully');
        return res.redirect('back');
    } catch (err) {
        console.log('Error', err);
    }
}