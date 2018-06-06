'use strict';


var request = require('request');

var Promises = require('promise');
var web3 = require('web3');

var mongoose = require('mongoose');

 var login = require("./functions/login")
// var landdetails = require("./functions/landdetails")
var register= require('./functions/register')

var path = require('path');
var cors = require('cors');
var cloudinary = require('cloudinary');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
web3.eth.defaultAccount = web3.eth.accounts[0];

var CoursetroContract = web3.eth.contract([
{
"constant": false,
"inputs": [
{
  "name": "_name",
  "type": "string"
},
{
  "name": "_aadharno",
  "type": "uint32"
},
{
  "name": "_phoneno",
  "type": "uint32"
}
],
"name": "newland",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "getfirstRegistrationDetails",
"outputs": [
{
  "name": "",
  "type": "string"
},
{
  "name": "",
  "type": "uint32"
},
{
  "name": "",
  "type": "uint32"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
}
]);
var Coursetro = CoursetroContract.at('0x692a70d2e424a56d2c6c27aa97d1a86395877b3a');
  console.log(Coursetro);


module.exports = router => {


//    router.post('/register',cors(),(req,res)=> {
  


        //const firstname = req.body.firstname;
        //console.log(firstname);
        //const lastname = req.body.lastname;
        //console.log(lastname);
        //const dateofbirth = req.body.dateofbirth;
        //console.log(dateofbirth);
        //const phonenumber = req.body.phonenumber;
        //console.log(phonenumber);
        //const email = req.body.email;
        //console.log(email);
        //const password = req.body.password;
        //console.log(password);
        //const retypepassword = req.body.retypepassword;
        //console.log(retypepassword);
        //const usertype = req.body.usertype;
        //console.log(usertype);

      //  if (!firstname || !lastname || !phonenumber|| !dateofbirth || !email || !password || !retypepassword || !usertype || !userId) {

            //res
              //  .status(400)
          //      .json({
            //        message: 'Invalid Request !'
        //        });

      //  } else {

    //register
    // .register(firstname,lastname,dateofbirth,phonenumber,email,password,retypepassword,usertype)
     //.then(result => {   
        //console.log("result ===>>>",result)
        //console.log("hello")
        //res.send({
        //    "message": "Register sucessfully",
        //    "status": true,
          //  "usertype":result.users.usertype
      //  });

    //})
    //.catch(err => res.status(err.status).json({
      //  m/essage: err.message
    //})//.json({
    //    status: err.status
  //  }));
//}}
//)


 router.post('/login',cors(),(req,res)=> {
    var UserName=req.body.UserName;
    console.log("UserName:",UserName);
     var email =req.body.email;
     console.log("email:",email);
     var password=req.body.password;
     console.log("password",password);

     login
      .login(UserName,email,password)
      .then(result => {   
         console.log("result ===>>>",result)
         console.log("hello")
         res.send({
             "message": "Login sucessfully",
             "status": true,
             "usertype":result.users.usertype
         });

     })
     .catch(err => res.status(err.status).json({
         message: err.message
     }).json({
         status: err.status
     }));
 },
 router.post('/firstregistrationdetails', cors(), (req, res) => {
          
  var name=req.body.name;
  console.log("Name:",name);
  var aadharno=req.body.aadharno;
  console.log("AadharNo:",aadharno);
  var phoneno=req.body.phoneno;
  console.log("PhoneNo:",phoneno);


   Coursetro.newland(name, aadharno,phoneno,function(error, result)  {            
       {
           // $("#get").html(result[0]+' ('+result[1]+' years old)');
           console.log(result);
       }
      

},
res.send ({
  message:"Sucessfully stored in Ethereum Ledger",
  status :"True"
})



)
})
 )}

 router.get('/getfirstregistrationdetails', cors(), (req, res) => {


Coursetro.getfirstRegistrationDetails( function(error, result) {            
  {
      // $("#get").html(result[0]+' ('+result[1]+' years old)');
      console.log(result);
  }
})

})