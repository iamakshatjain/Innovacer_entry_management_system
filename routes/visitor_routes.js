const mongoose = require("mongoose");
const router = require('express').Router();
const mailjet = require("node-mailjet").connect(
  "1e977f6e138d3b4000b30ba0ee73b995",
  "2777d25dad8fa25676c9bf3123227dd8"
);

const Visitor = require("../models/visitor");
const Host = require("../models/host");

//Create
router.post("/add", (req, res) => {
  //for parsing as the data came in application/x-www-form-urlencoded
  const visitor = JSON.parse(Object.keys(req.body)[0]);
  console.log(visitor);
  
  // var flag = true;
  //check if the user doesn't already exists that is checked in - NO USER FOUND
  // Visitor.findOne({email : visitor.email, status:"CHECKEDIN"}, (err, foundVisitor) => {
  //   if(err){
  //     console.error(err);
  //     res.send({ error: err });
  //   }

  //   if(foundVisitor){
  //     res.send({ error: "VISITORFOUND" });
  //   }
  // });
  
  //check if the host does or doesn't exist - NO HOST FOUND
  // Host.findOne(
  //   { email: visitor.host_email, name: visitor.host_name, phone:visitor.host_phone },
  //   (err, foundHost) => {
  //     console.log("checking host");
  //     if (err) {
  //       console.error(err);
  //       res.send({ error: err });
  //       return;
  //     }

  //     if (foundHost === null) {
  //       console.log("host not found");
  //       res.send({ error: "NOHOSTFOUND" });
  //       return;
  //     }
  //   }
  // );

  var visitor_updated = {...visitor, status : "CHECKEDIN", check_in : Date.now(), created_at : Date.now()};
  //creating a vistor
  Visitor.create(visitor_updated, async(err, createdVisitor) => {
      if(err){
          console.error(err);
          res.send({error : err});
          return;
      }

      console.log("VISITOR CREATED");
      
      const request = await mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: "wastea33@gmail.com",
              Name: "Akshat Jain"
            },
            To: [
              {
                Email: `${visitor.host_email}`,
                Name: `${visitor.host_name}`
              }
            ],
            Subject: "Greetings from Innovacer.",
            TextPart: `Visitor waiting for you at the reception.\n\nVisitor Details,  \nVisitor name : ${visitor.name} \nVisitor email : ${visitor.email} \nVisitor phone : ${visitor.phone}\n\nPlease recieve the person timely.`,
            CustomID: "AppGettingStartedTest"
          }
        ]
      });

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
// router.get("/read", (req, res) => {
//     const userId = req.query.uid;
//     Visitor.find({_id : mongoose.Types.ObjectId(userId)}, (err, visitor) => {
//         if (err) {
//         console.error(err);
//         res.send({ error: err });
//         return;
//         }
    
//         if (visitor === null) {
//           res.send({ error: "NO VISITOR FOUND" });
//           return;
//         }

//         console.log("VISITOR READ");
//         res.send(visitor);
//   });
// });

//Update - to checkout the visitor
router.put("/checkout", (req, res) => {
  const userMail = req.query.e;

  Visitor.findOne({ email : userMail }, (err, visitor) => {
    console.log(visitor);
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
    visitor.save(async(err) => {
        if (err) {
        console.error(err);
        res.send({ error: err });
        return;
        }
        //email to the visitor
        const request = await mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: "wastea33@gmail.com",
              Name: "Akshat Jain"
            },
            To: [
              {
                Email: `${visitor.host_email}`,
                Name: `${visitor.host_name}`
              }
            ],
            Subject: "Greetings from Innovacer.",
            TextPart: `Thanks for visiing Innovacer.\n\nVisit Details,  \nVisitor name : ${visitor.name} \nVisitor phone : ${visitor.phone} \nCheck In Time : ${new Date(visitor.check_in).toLocaleString()}\nCheck Out Time : ${new Date(visitor.check_out).toLocaleString()}\nHost Name : ${visitor.host_name}\nAddress Visited : ${visitor.add_visited}\n\nHave a nice day!.`,
            CustomID: "AppGettingStartedTest"
          }
        ]
      });
        //todo : sms to the visitor
        console.log("VISITOR CHECKED OUT");
        res.send({status : "CHECKED OUT"});
    })
  });
});


//Delete - we don't need to delete visitor list for future references


module.exports = router;