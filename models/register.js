'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registerpageSchema = mongoose.Schema({
    
 firstname:String,
lastname:String,
dateofbirth:Number,
phonenumber:Number,
email:String,
password:Number,
retypepassword:Number,
usertype:String
});


mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/digitalId', { useMongoClient: true });

mongoose.connect('mongodb://ethereum:ethereum@123@ds231360.mlab.com:31360/login', {
    useMongoClient: true
});


// mongodb://Arjunan:Arjunan24@ds231360.mlab.com:31360/login
module.exports = mongoose.model('user', registerpageSchema);