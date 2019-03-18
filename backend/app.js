const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const UserRouter = require('./routes/users');
const AuthRouter = require('./routes/auth');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}).then(()=>{
  console.log("connected ");
}).catch(()=>{
  console.log("Connection failed");
});

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
next();
});
app.use("/api/post",UserRouter);
app.use("/api/auth",AuthRouter);

module.exports =app;
