const mongoose = require("mongoose");
const router = require("express").Router();

const Host = require("../models/host");

//Create
router.post("/add", (req, res) => {
  const host = req.body;
  
  //creating a host
  var host_updated = {...host, created_at : Date.now()};
  // console.log(host_updated);
  Host.create(host_updated, async(err, createdHost) => {
      if(err){
          console.error(err);
          res.send({error : err});
          return;
      }

      console.log("HOST CREATED");
      res.send(createdHost);
  })
});

//Read
router.get("/read/all", (req, res) => {

    //finding all the host's list - for the home page
    Host.find({},(err,hosts) => {
        if(err){
            console.error(err);
            res.send({error : err});
            return;
        }

        console.log("HOSTS LIST READ");
        res.send(hosts);
    });
});

//Read
router.get("/read", (req, res) => {
    const userId = req.query.uid;
    Host.find({_id : mongoose.Types.ObjectId(userId)}, (err, host) => {
      if (err) {
      console.error(err);
      res.send({ error: err });
      return;
      }
      if (host === null) {
        res.send({ error: "NO HOST FOUND" });
        return;
      } 

      console.log("HOST READ");
      res.send(host);
  });
});

//Update - to edit the host info
router.put("/edit", (req, res) => {
  const userId = req.query.uid;
  const data = req.body;
  Host.findOne({ _id: mongoose.Types.ObjectId(userId) }, (err, foundHost) => {

    if (err) {
        console.error(err);
        res.send({ error: err });
        return;
        }
    if (foundHost === null) {
      res.send({ error: "NO HOST FOUND" });
      return;
    }

    foundHost.name = req.body.name;
    foundHost.email = req.body.email;
    foundHost.phone = req.body.phone;
    foundHost.address = req.body.address;

    foundHost.save((err) => {
        if (err) {
          console.error(err);
          res.send({ error: err });
          return;
        }
        console.log("HOST EDITED");
        res.send({status : "UPDATED"});
    });
  });
});


//Delete - if any time the host leaves the organisation
router.delete("/del", (req, res) => {
  const userId = req.query.uid;
  Host.deleteOne({ _id: mongoose.Types.ObjectId(userId) }, (err) => {
    if(err){
        console.error(err);
        res.send({ error: err });
        return;
    }

    console.log("HOST DELETED");
    res.send({ status: "DELETED" });

  });
})


module.exports = router;