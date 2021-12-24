var express = require("express");
var bodyParse = require("body-parser");
var mongoose = require("mongoose");

var app = express();

app.use(bodyParse());

app.get("/hello", (req, resp) => {
  console.log("Hello World");
  resp.status(200).send("world");
});

app.get("/log", (req, resp) => {
  console.log("Hello World");
  resp.status(200).send("Narimane");
});

const Message = mongoose.model("Message", {
  user_name: String,
  message: String,
  time: Date,
});

app.post("/login", (req, resp) => {
  console.log("lllllllllll", req.body);
  resp.status(200).send("Ok !!");
});

app.post("/sendmessage", async (req, res) => {
  let user_name = req.body.nickname;
  let message = req.body.message;
  let doc = new Message({
    user_name: user_name,
    message: message,
    time: new Date(),
  });
  await doc.save();
  res.status(200);
  res.send("ok");
});

app.get("/getallmessages", async (req, res) => {
  let user = req.query.user || "";
  console.log(user);
  Message.find(user == "" ? {} : { user_name: user }, (err, messages) => {
    if (!err) {
      res.status(200);
      res.json(messages);
    } else {
      res.status(300);
      res.send("NOT OK");
    }
  });
});

mongoose
  .connect(
    "mongodb+srv://hello:world@cluster0.foo8h.mongodb.net/facebook2?retryWrites=true&w=majority"
  )
  .then((db) => {})
  .catch((err) => {
    console.log(err);
  });
app.listen(666);
