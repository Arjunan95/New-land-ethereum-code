'use strict';


var request = require('request');

var Promises = require('promise');
var web3 = require('web3');

var mongoose = require('mongoose');
var http=require('http');

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



//if (typeof web3 !== 'undefined') {
  //web3 = new web3(web3.currentProvider);
//} else {
  // set the provider you want from Web3.providers
  var web3 = new web3(); 
  web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
 // web3.setProvider(new web3.providers.HttpProvider())
  //web3 = new web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//}
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
			},
			{
				"name": "_propertyId",
				"type": "uint32"
			}
		],
		"name": "newlandreg",
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
])
var Coursetro = CoursetroContract.at('0x668ed30aacc7c7c206aaf1327d733226416233e2');
  console.log(Coursetro);


module.exports = router => {



 router.post('/fg', cors(), (req, res) => {
          
  var _name=req.body.name; 
  console.log("Name:",_name);
  var _aadharno=req.body.aadharno;
  console.log("AadharNo:",_aadharno);
  var _phoneno=req.body.phoneno;
  console.log("PhoneNo:  ",_phoneno);
  var  propertyId = "";
       var possible = "0123456789674736728367382772898366377267489457636736273448732432642326734"
       for (var i = 0; i < 5; i++)
	   propertyId += (possible.charAt(Math.floor(Math.random() * possible.length))).toString();
       console.log("propertyId : " + propertyId)
  
  console.log("123")
  Coursetro.newlandreg(_name,_aadharno,_phoneno,propertyId,{
        from: web3.eth.accounts[0],
		 gas: 4779969,
		
     })

	 console.log("arjun")    
res.send ({
  message:"Sucessfully stored in Ethereum Ledger",
  status :"True"
})




})


 router.get('/gf', cors(), (req, res) => {
	var propertyno=req.body.propertyId
	console.log("Current Owner Details:",propertyno);

  Coursetro.getfirstRegistrationDetails(propertyno, function(error, result) {            
  {
      // $("#get").html(result[0]+' ('+result[1]+' years old)');
      console.log(result);
  }
  res.send ({
    message:result,
    status :"True"
  })
  
})

})
}