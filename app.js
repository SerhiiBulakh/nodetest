const express = require('express');
const bodyParser = require('body-parser');
const app = express();
global.config = require('./config');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const db = require('./models/db');
let feed;
io.on('connection',function(socket) {
  feed = require('./models/feeds')(socket);
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('./controllers')); 
app.use(require('./middlewares/TokenValidator')); 


app.listen(config.port,function() {
  console.log(`Listening at Port ${config.port}`);
});
