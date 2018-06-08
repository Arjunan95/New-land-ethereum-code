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



if (typeof web3 !== 'undefined') {
  web3 = new web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new web3(new Web3.providers.HttpProvider("http://localhost:8545"));
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
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
])
var Coursetro = CoursetroContract.at('0x0b9825d065745d3d9e0c1917280249c485496bc7');
  console.log(Coursetro);


module.exports = router => {



 router.post('/fg', cors(), (req, res) => {
          
  var _name=req.body.name; 
  console.log("Name:",_name);
  var _aadharno=req.body.aadharno;
  console.log("AadharNo:",_aadharno);
  var _phoneno=req.body.phoneno;
  console.log("PhoneNo:",_phoneno);
  
  
  Coursetro.newlandreg(_name,_aadharno,_phoneno, {
        from: web3.eth.accounts[0],
         gas: 4779969,
     })

    
res.send ({
  message:"Sucessfully stored in Ethereum Ledger",
  status :"True"
})




})


 router.get('/gf', cors(), (req, res) => {


  Coursetro.getfirstRegistrationDetails( function(error, result) {            
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