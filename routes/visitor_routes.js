const mongoose = require("mongoose");
const router = require('express').Router();
const mailjet = require("node-mailjet").connect(
  "1e977f6e138d3b4000b30ba0ee73b995",
  "2777d25dad8fa25676c9bf3123227dd8"
);

const axios = require("axios");

//accessing visitor and host models and collections
const Visitor = require("../models/visitor");
const Host = require("../models/host");

//Create
router.post("/add", (req, res) => {

  //for parsing as the data came in application/x-www-form-urlencoded
  const visitor = JSON.parse(Object.keys(req.body)[0]);

  // check if the user doesn't already exists that is checked in - NO USER FOUND
  Visitor.findOne({email : visitor.email, status:"CHECKEDIN"}, (err, foundVisitor) => {
    if(err){
      console.error(err);
      res.send({ error: err });
      return;
    }

    if(foundVisitor!==null){
      console.log("found a similar user");
      res.send({ error: "VISITORFOUND" });
      return;
    }
    else{
      //check if the host does or doesn't exist - NO HOST FOUND
      //commented for evaluation puposes
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
          // else{
            var visitor_updated = {
              ...visitor,
              status: "CHECKEDIN",
              check_in: Date.now(),
              created_at: Date.now()
            };
            //creating a vistor
            Visitor.create(visitor_updated, async (err, createdVisitor) => {
              if (err) {
                console.error(err);
                res.send({ error: err });
                return;
              }
              else{
                console.log("VISITOR CREATED");

                const request = mailjet
                  .post("send", { 'version': 'v3.1' })
                  .request({
                    "Messages": [
                      {
                        "From": {
                          "Email": "wastea33@gmail.com",
                          "Name": "Arthur"
                        },
                        "To": [
                          {
                            "Email": `${visitor.host_email}`,
                            "Name": `${visitor.host_name}`
                          }
                        ],
                        "Subject": "Greetings from Akshat",
                        "TextPart": `Visitor waiting for you at the reception.\n\nVisitor Details,  \nVisitor name : ${visitor.name} \nVisitor email : ${visitor.email} \nVisitor phone : ${visitor.phone}\n\nPlease recieve the guest timely.`,
                        // "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!"
                      }
                    ]
                  })
                request
                  .then((result) => {
                    console.log("Email Sent");
                    res.send(createdVisitor);
                    return;
                  })
                  // .then(() => {
                  //   const url = "https://www.way2sms.com";
                  //   req_params = {
                  //     'apikey': 'DID8T8O5X57586ODQ844J6JY6LJLO521',
                  //     'secret': 'U379Q4VPXW6NX319',
                  //     'usetype': 'stage',
                  //     'phone': visitor.host_phone,
                  //     'message': `Visitor waiting for you at the reception.\n\nVisitor Details,  \nVisitor name : ${visitor.name} \nVisitor email : ${visitor.email} \nVisitor phone : ${visitor.phone}\n\nPlease recieve the guest timely.`,
                  //     // 'senderid': senderId
                  //   }
                  //   return axios.post(url, req_params);
                  //   console.log("sending sms...");
                  // })
                  // .then((resp) => {
                  //   console.log("sending sms");
                  //   console.log(resp.data);
                  //   if(resp.data.text)
                  //     console.log("SMS sent");
                  //   return;
                  // })
                  // .then(()=>{
                  //   res.send(createdVisitor);
                  // })
                  .catch((err) => {
                    console.log(err);
                    console.log("Error while sending message");
                    console.log(err.statusCode)
                    if(err.statusCode == null)
                      res.send({ error: "NETWORKISSUE" });
                    else
                      res.send({error : err});
                    return;
                  })   
              }
            });
          // }
        // }
      // );
    }
  });
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

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}

//Update - to checkout the visitor
router.put("/checkout", (req, res) => {
  const userMail = req.query.e;

  Visitor.findOne({ email : userMail, status:"CHECKEDIN" }, (err, visitor) => {
    if (err) {
        console.error(err);
        res.send({ error: err });
        return;
        }
    
    //if no visitor is inside - there is an error
    if (visitor == null) {
      console.log("no visitor is found");
      res.send({ error: "NOVISITORFOUND" });
      return;
    }else{

      //checking out the user - if the visitor is inisde
      visitor.check_out = Date.now();
      visitor.status = "CHECKEDOUT";
      visitor.save(async(err) => {
          if (err) {
          console.error(err);
          res.send({ error: err });
          return;
          }
          else{
            // email to the visitor
            const request = mailjet
              .post("send", { 'version': 'v3.1' })
              .request({
                "Messages": [
                  {
                    "From": {
                      "Email": "wastea33@gmail.com",
                      "Name": "Arthur"
                    },
                    "To": [
                      {
                        "Email": `${visitor.email}`,
                        "Name": `${visitor.name}`
                      }
                    ],
                    "Subject": "Greetings from Akshat",
                    "TextPart": `Thanks for visiing Innovacer.\n\nVisit Details,  \nName : ${visitor.name} \nPhone : ${visitor.phone} \nCheck In Time : ${new Date(parseInt(visitor.check_in)).toLocaleString()}\nCheck Out Time : ${new Date(parseInt(visitor.check_out)).toLocaleString()}\nHost Name : ${visitor.host_name}\nAddress Visited : ${visitor.add_visited}\n\nHave a nice day!.`,
                  }
                ]
              })
            request
              .then((result) => {
                console.log("Email Sent");
              })
              .then(() => {
                console.log("VISITOR CHECKED OUT");
                res.send({ status: "CHECKED OUT" });
                return;
              })
              .catch((err) => {
                console.log("Error while sending message");
                console.log(err.statusCode)
                res.send({ error: err });
                return;
              })
          } 
      })
    }
  });
});


//Delete - we don't need to delete visitor list for future references


module.exports = router;