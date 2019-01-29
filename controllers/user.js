const express = require('express');
const router = express.Router();
const db = require('../models/db');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

router.post('/',function(req,res) {
 
  const data = {
    email : req.body.emailAddress,
    password : req.body.password
  };
  const model = new db();
  model.addNewUser(data,function(error,response) {
    if(error) {
      return res.json({"error" : true,"message" : error})
    }
    res.json({"error" : false,"message" : "Added new user"});
  });
});

router.post('/login',function(req,res) {
  const model = new db();
  
  model.findUser(req.body.emailAddress,function(error,response) {
    if(error) {
      return res.json({"error" : true,"message" : error});
    }
    if(!response) {
      return res.json({"error" : true,"message" : "User not found"});
    }
    if(response.password !== req.body.password) {
      return res.json({"error" : true,"message" : "Password mismatch"});
    }
    const token = jwt.sign(response, global.config.secret, {
    	expiresIn: 1440 
    });

    res.json({
    	error: false,
    	message: 'Validation successful!',
    	token: token
    });
  });
});

router.post('/restore', function(req, res) {
  const model = new db();

  model.findUser(req.body.emailAddress, function(error, response) {
    if(error) {
      return res.json({"error" : true,"message" : error});
    }
    
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vasyabrickin@gmail.com',
    pass: 'bv1234567890'
  }
});

const mailOptions = {
  from: 'vasyabrickin@gmail.com',
  to: req.body.emailAddress,
  subject: 'Sending password',
  text: req.body.password
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
  })
})
module.exports = router;
