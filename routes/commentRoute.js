var express = require("express");
var router = express.Router();
var item = require("../models/personSchema");
var Comment = require("../models/commentSchema");
var middleware = require("../middleware");

router.get("/detail/:id/comments/new",middleware.isLoggedIn,function(req,res){
    item.findById(req.params.id,function(err, person){
        if(err){
            console.log(err);
        }else{
            res.render("newComment",{person:person});
        }
    });
});

router.post("/detail/:id/comments",middleware.isLoggedIn,function(req,res){
    item.findById(req.params.id,function(err,person){
        if (err){
            req.flash("error","Something went wrong");
            console.log(err);
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if (err){
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.author.Fname = req.user.Fname;
                    comment.save();
                    person.comments.push(comment);
                    person.save();
                    req.flash("success","Successfully added comment");
                    res.redirect('/detail/'+person._id);
                }
            });
        }
    });
});
//comments edit route
router.get("/detail/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err, foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("editComment",{person_id:req.params.id,comment: foundComment}); 
        }
    });
});

//comments update
router.put("/detail/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err, updatedComment){
        if (err){
            res.redirect("back");
        }else{
            res.redirect("/detail/" + req.params.id);
        }
    });
});

//comments delete
router.delete("/detail/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndDelete(req.params.comment_id,function(err){
        if (err){
            res.redirect("back");
        }else{
            req.flash("success","Comment deleted");
            res.redirect("/detail/" + req.params.id);
        }
    });
});

module.exports = router;