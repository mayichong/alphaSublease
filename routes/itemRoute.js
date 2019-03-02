var express = require("express");
var router = express.Router();
var item = require("../models/personSchema");
var middleware = require("../middleware");

//Homepage
router.get("/",function(req,res){
    item.find({},function(err,allItem){
        if (err){
            console.log(err);
        }else{
            res.render("index",{hello:allItem});
        }
    });
});

//Add new item
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("new");
});

router.get("/about",function(req,res){
    res.render("about");
})

router.get("/profile",middleware.isLoggedIn,function(req,res){
    res.render("profile");
});

//Detail
router.get("/detail/:id",function(req,res){
    item.findById(req.params.id).populate("comments").exec(function(err,foundPerson){
        if (err){
            console.log(err);
        }else{
            res.render("detail",{hello:foundPerson});
        }
    });
});
//Post new redirect
router.post("/newPerson",middleware.isLoggedIn,function(req,res){
    req.body.person.des = req.sanitize(req.body.person.des);
    req.body.person.author = {
        id: req.user._id,
        username: req.user.username
      };
    item.create(req.body.person,function(err,personCreated){
        if (err){
            console.log(err);
        }else{
            console.log(personCreated);
            res.redirect("/");
        }
    });

});

//Edit
router.get("/detail/:id/edit",middleware.checkPersonOwnership,function(req,res){
            item.findById(req.params.id,function(err,foundPerson){
                if (err){
                    req.flash("err","person is not exist");
                }
            res.render("edit",{hello:foundPerson});
        });
});

//Update
router.put("/detail/:id/",middleware.checkPersonOwnership,function(req,res){
    req.body.person.des = req.sanitize(req.body.person.des);
    item.findByIdAndUpdate(req.params.id,req.body.person,function(err,updatedPerson){
        if (err){
            console.log(err);
        }else{
            res.redirect("/detail/" + req.params.id);
        }
    });
});

//Delete
router.delete("/detail/:id",middleware.checkPersonOwnership,function(req,res){
    item.findByIdAndDelete(req.params.id,function(err){
        if (err){
            console.log(err);
        }else
        res.redirect("/");
    });
});

module.exports = router;