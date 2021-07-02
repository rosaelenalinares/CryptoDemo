// lib and imports
const express = require("express");
const app = express();

const myFirstCOntroller = require("./controllers/controller")

// app setup
app.use(express.json())
app.use("/static", express.static("public"));
app.set("view engine", "ejs");


// pages
app.get('/',(req, res) => {
  res.render('home.ejs');
});

app.get('/coins',(req, res) => {
  res.render('coins.ejs');
});

app.get('/chart',(req, res) => {
  res.render('chart.ejs');
});

app.get('/Comment',(req, res) => {
  res.render('Comment.ejs');
});

app.get('/news',(req, res) => {
  res.render('news.ejs');
});


// Create here your api setup

app.post('/api/addfavorites', (req, res) => {
  myFirstCOntroller.addFavoritesToDB(req.body)
});

app.post('/api/favorites', myFirstCOntroller.getFavoritesFromdb);

app.post('/api/delete', (req, res) => {
  myFirstCOntroller.deleteFavorites(req.body)
});

app.post('/api/addcomments', (req,res) => {
  myFirstCOntroller.addCommentToDB(req.body)
});

app.post('/api/getcomments', (req, res) => {
  myFirstCOntroller.getCommentsFromDB(res)
});

app.post('/api/deletecomments', (req, res) => {
  myFirstCOntroller.deleteComments(req.body)
});

app.post('/api/addreply', (req,res) => {
  myFirstCOntroller.addReplyToDB(req.body)
});


app.listen(process.env.PORT || 4000, () => console.log("Server Up and running"));
