const express = require('express');
const router = express.Router();


router.get('/',function(req,res) {
  res.json({message : "Hello World"});
});

router.use('/user',require('./user'));
router.use('/polls',require('./polls'));

module.exports = router;
