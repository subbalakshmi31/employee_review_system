const User = require('../models/user');
const AssignedReview = require('../models/assignedReview');
const MyReview = require('../models/myReview')

//function to display Assigned Reviews to user and user's Reviews from other employees 
module.exports.home = async function(req, res){
    try {
        let user = await User.findById(req.user.id).populate({
            path: 'assignedReviews',
            populate:
            {
                path: 'toUser'
            }
        }).populate({
            path: 'myReviews',
            populate:
            {
                path: 'fromUser'
            }
        });
        res.render('home', {
            user: user
        }
        );
    } catch (err) {
        console.log('Error', err);
    }
}

//function to submit review
module.exports.completeReview = async function(req, res){
    try {
        let review = await AssignedReview.findOne({ fromUser: req.user, toUser: req.body.toUser });
        await User.findByIdAndUpdate(req.user, { $pull: { assignedReviews: review.id } });
        await AssignedReview.findByIdAndDelete(review.id);

        review = await MyReview.create({
            fromUser: req.user,
            toUser: req.body.toUser,
            message: req.body.message
        });

        let user = await User.findById(req.body.toUser);
        user.myReviews.push(review);
        user.save();

        req.flash('success', 'Review Submitted Successfully');
        return res.redirect('back');
    } catch (err) {
        console.log('Error', err);
    }
}