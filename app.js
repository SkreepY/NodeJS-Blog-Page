const express = require("express");
const morgan = require("morgan");
const app = express();

const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");

//Database Connections
const dbURI =
  "mongodb+srv://semih:552003@cluster0.caqcmmk.mongodb.net/Blogs?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

//View Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("assets"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

//Routings
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//Blog Routes
app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.render("404", { title: "404" });
});

app.listen(5000);
