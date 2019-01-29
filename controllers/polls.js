const express = require('express');
const router = express.Router();
const pollModel = require('../models/polls');

router.route('/')
  .get(function(req,res) {
    
    const pollObject = new pollModel();
   
    pollObject.getAllPolls(function(err,pollResponse) {
      if(err) {
        return res.json({"responseCode" : 1, "responseDesc" : pollResponse});
      }
      res.json({"responseCode" : 0, "responseDesc" : "Success", "data" : pollResponse});
    });
  })
  .post(function(req,res) {
    
    const pollObject = new pollModel();
    
    pollObject.addNewPolls(req.body,function(err,pollResponse) {
      if(err) {
        return res.json({"responseCode" : 1, "responseDesc" : pollResponse});
      }
      res.json({"responseCode" : 0, "responseDesc" : "Success","data" : pollResponse});
    });
  })
  .put(function(req,res) {
    
    const pollObject = new pollModel();
    
    pollObject.votePollOption(req.body,function(err,pollResponse) {
      if(err) {
        return res.json({"responseCode" : 1, "responseDesc" : pollResponse});
      }
      res.json({"responseCode" : 0, "responseDesc" : "Success", "data" : pollResponse});
    });
  });

module.exports = router;