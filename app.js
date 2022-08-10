const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose")
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Hi there Sirjan this side, Welsome to my Blog section I post about random stuff that I like";
const contactContent = "Use provided links to contact me";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Sirjan:Sirjan@demo.eekxi.mongodb.net/postDB")
//Schema
const postsSchema={
        Title:String,
        Content:String
}
//model name
const Post=mongoose.model("Post", postsSchema)


app.get("/", function(req, res){
  Post.find({},function(err,result){
    if(!err){
      res.render("home", {
        startingContent: homeStartingContent,
        posts: result
        });

    }
  }
  )
  
});

app.get("/home", function(req, res){
  res.redirect("/");
  
});


app.get("/about", function(req, res){
  res.redirect("https://kingslayer-ks.github.io/");
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent, 
                        twitter:"https://twitter.com/KingSlayer_ks", 
                        linkedin:"https://www.linkedin.com/in/sirjandeep-singh-kandhari/", 
                         github:"https://github.com/KingSlayer-KS",
                         mail:"mailto:sirjanssk2933@proton.me" });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const poste = new Post ({
    Title: req.body.postTitle,
    Content: req.body.postBody
  });

  poste.save(function(err){
    if(!err){
    res.redirect("/");
  }
  });

});

app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;
  // const requestedId=req.
  Post.findById(requestedPostId, function(err,post){
    if(!err){
      res.render("post", {
            Title: post.Title,
            Content: post.Content
          });
        }
  })




});





  // posts.forEach(function(post){
  //   const storedTitle = _.lowerCase(post.title);

  //   if (storedTitle === requestedTitle) {
  //     
  //   }
  // });











  let port = process.env.PORT;
  if (port == null || port == "") {
    port = 3000;
  }
  app.listen(port);
