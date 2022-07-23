//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');


const homeStartingContent = "Hi Sirjan this side";
const aboutContent = "Sirjan this side, a web developer, gamer and curious kid. Wana talk drop me Hi! --> sirjanssk2933@proton.me";
const contactContent = "Drop me Hi! --> sirjanssk2933@proton.me";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts=[];


app.get("/", function(req,res){

  res.render("home",{Para:homeStartingContent,Postan:posts});

});
app.get("/home", function(req,res){

  res.redirect("/");

});

app.get('/posts/:postno', (req, res) => {
  if(posts.length!=0){
  posts.forEach(function(post){
    let title=_.lowerCase(post.title);
    let content=_.lowerCase(post.content);
    let lowerPram=_.lowerCase(req.params.postno);
    if(lowerPram===title){
      res.render("post",{postTitle:title,postContent:content});
          }
        }
      )
    }
  }
);

app.get("/about", function(req,res){

  res.render("about",{AboutPara:aboutContent});

});

app.get("/contact", function(req,res){

  res.render("contact",{contactPara:contactContent});

});

app.get("/compose", function(req,res){


  res.render("compose");

});

app.post("/compose", function(req,res){
  var Post={title:req.body.PostTitle ,
            content: req.body.PostText};
  posts.push(Post);
  res.redirect("/")

});











let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
