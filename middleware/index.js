var item = require("../models/personSchema");
var Comment = require("../models/commentSchema");
var middlewareObj = {};

middlewareObj.checkPersonOwnership= function (req,res,next){
    if (req.isAuthenticated()){
        item.findById(req.params.id,function(err,foundPerson){
        if (err){
            req.flash("error","Person not found");
            res.redirect("back");
        }else{
            if (foundPerson.author.id.equals(req.user._id)){
                next();
            }else{
                req.flash("error","You don't have permissions to do that!");
                res.redirect("back");
            }
        }
    });
}else{
    res.redirect("back");
}
}

middlewareObj.checkCommentOwnership = function (req,res,next){
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
        if (err){
            res.redirect("back");
        }else{
            if (foundComment.author.id.equals(req.user._id)){
                next();
            }else{
                req.flash("error","You don't have permission to do that!");
                res.redirect("back");
            }
        }
    });
}else{
    req.flash("error","You need to be logged in to do that!");
    res.redirect("back");
}
}

middlewareObj.isLoggedIn = function (req,res,next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that!");
    res.redirect("/login");
}

module.exports = middlewareObj;