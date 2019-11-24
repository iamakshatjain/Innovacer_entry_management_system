const mongoose = require("mongoose");
const router = require('express').Router();

const Visitor = require("../models/visitor");

//Create
router.post("/add", (req, res) => {
  const visitor = req.body;
  //checking in the user
  var visitor_updated = {...visitor, status : "CHECKEDIN", check_in : Date.now(), created_at : Date.now()};
  //creating a vistor
  Visitor.create(visitor_updated, async(err, createdVisitor) => {
      if(err){
          console.error(err);
          res.send({error : err});
          return;
      }

      console.log("VISITOR CREATED");
      //todo : make the email and sms request to the host
      res.send(createdVisitor);
  })
});

//Read
router.get("/read/all", (req, res) => {
    //finding all the visitor's list - for the home page
    Visitor.find({},(err,visitors) => {
        if(err){
            console.error(err);
            res.send({error : err});
            return;
        }

        console.log("VISITORS LIST READ");
        res.send(visitors);
    });
});

//Read
router.get("/read", (req, res) => {
    const userId = req.query.uid;
    Visitor.find({_id : mongoose.Types.ObjectId(userId)}, (err, visitor) => {
        if (err) {
        console.error(err);
        res.send({ error: err });
        return;
        }
    
        if (visitor === null) {
          res.send({ error: "NO VISITOR FOUND" });
          return;
        }

        console.log("VISITOR READ");
        res.send(visitor);
  });
});

//Update - to checkout the visitor
router.put("/checkout", (req, res) => {
  const userId = req.query.uid;
  Visitor.findOne({ _id: mongoose.Types.ObjectId(userId) }, (err, visitor) => {
    if (err) {
        console.error(err);
        res.send({ error: err });
        return;
        }
    if (visitor === null) {
      res.send({ error: "NO VISITOR FOUND" });
      return;
    }

    //checking out the user
    visitor.check_out = Date.now();
    visitor.status = "CHECKEDOUT";
    visitor.save((err) => {
        if (err) {
        console.error(err);
        res.send({ error: err });
        return;
        }
        //todo:email to the visitor
        console.log("VISITOR CHECKED OUT");
        res.send({status : "CHECKED OUT"});
    })
  });
});


//Delete - we don't need to delete visitor list for future references


module.exports = router;