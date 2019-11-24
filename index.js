const app = (require('express'))();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");

app.use(cors());

mongoose.connect("mongodb://localhost/innovacer", {useNewUrlParser : true});

const visitorRoutes = require("./routes/visitor_routes");
const hostRoutes = require("./routes/host_routes");

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", (req, res) => {
  res.send("Working fine sir");
});


app.use("/api/visitor", visitorRoutes);
app.use("/api/host", hostRoutes);

app.get("*", (req, res) => {
    res.send("This route doesn't exist");
})

app.listen(process.env.PORT || 5000, (err) => {
    if(err){
        console.error(err);
    }
    else
        console.log("Working fine sir");
})