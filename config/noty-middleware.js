// for configuring flash messages when there is success or error
module.exports.setFlash = function(req, res, next){
    res.locals.flash = {
        'success' : req.flash('success'),
        'error' : req.flash('error')
    }
    next();
}