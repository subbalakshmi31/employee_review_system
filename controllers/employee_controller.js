const User = require('../models/user');
const AssignedReview = require('../models/assignedReview');
const MyReview = require('../models/myReview');

//function to display all users in the Employee Section
module.exports.home = async function(req, res){
    try{
        let users = await User.find({});
        res.render('employeeSection', {
            users: users
        });
    }catch(err){
        console.log('Error', err);
    }
}

//function to update employee details in the Employee Section
module.exports.update = async function(req, res){
    try {
        let user = await User.findById(req.params.id);

        if (user.name == req.body.name && user.email == req.body.email && user.password == req.body.password) {
            req.flash('success', 'No Values Updated');
            return res.redirect('back');
        }

        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;

        user.save();
        req.flash('success', 'User Updated succesfully');
        return res.redirect('back');
    } catch (err) {
        console.log('Error', err);
        return res.redirect('back');
    }
}

//function to delete employee and corresponding reviews assigned to employee and assigned by employee
module.exports.delete = async function(req, res){
    try {
        let user = await User.findById(req.params.id);
        await user.deleteOne();

        let assignedReviews = await AssignedReview.find({ toUser: req.params.id });
        for(let review of assignedReviews){
            let userid = review.fromUser;
            await User.findByIdAndUpdate(userid, {$pull : {assignedReviews:review.id}});
            await review.deleteOne();
        }

        let myReviews = await MyReview.find({ fromUser: req.params.id })

        for (let review of myReviews) {
            let userid = review.toUser;
            await User.findByIdAndUpdate(userid, { $pull: { myReviews: review.id } });
            await review.deleteOne();
        }
        res.redirect('back');
    } catch (err) {
        console.log('Error', err);
    }
}

//function to change role of employee to admin
module.exports.makeAdmin = async function(req, res){
    try {
        let user = await User.findById(req.params.id);
        user.permission = 'admin';
        user.save();
        req.flash('success', `${user.name} promoted as Admin`);
        return res.redirect('back');
    } catch (err) {
        console.log('Error', err);
        return res.redirect('back');
    }
}

// function to change role of admin to employee
module.exports.removeAdmin = async function(req, res){
    try {
        let user = await User.findById(req.params.id);
        user.permission = 'employee';
        user.save();
        req.flash('success',`${user.name} removed as Admin`);
        return res.redirect('back');
    } catch (err) {
        console.log('Error', err);
        return res.redirect('back');
    }
}