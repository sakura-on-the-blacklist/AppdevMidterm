const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// app.get("/", (req,res)=>{
//  res.send("hello world!")}); essentially the same ↕︎

//the route in user.js is imported here
const userRoutes = require("./routes/user");


//bodyParser needs to come before the routing because it processes the incoming request data before it reaches the route handlers
app.use(bodyParser.json());

//route handlers expect pardsed data (handlers cant have an access to the req.body => getting undefined even tho the input data is correctly inputted)
app.use("/users", userRoutes);

//initialization
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
