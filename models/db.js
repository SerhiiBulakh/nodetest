
const rethinkdb = require('rethinkdb');
const async = require('async');
class db {


  connectToDb(callback) {
    rethinkdb.connect({
      host : 'localhost',
      port : 28015,
      db : 'users'
    }, function(err,connection) {
      callback(err,connection);
    });
  }


  findUser(emailAddress,callback) {
    const self = this;
    async.waterfall([
    function(callback) {
      self.connectToDb((err,connection) => {
        if(err) {
          return callback(true,"Error connecting to database");
        }
        callback(null,connection);
      });
    },
    function(connection,callback) {
      rethinkdb.table('login').filter({"email" : emailAddress}).run(connection,function(err,cursor) {
        connection.close();
        if(err) {
          return callback(true,"Error fetching user from database");
        }
        cursor.toArray(function(err, result) {
          if(err) {
            return callback(true,"Error reading cursor");
          }
         
          callback(null,result[0]);
        });
      });
    }
    ],function(err,data) {
      callback(err === null ? false : true,data);
    });
  }

  addNewUser(userData,callback) {
   const self = this;
    async.waterfall([
      function(callback) {
        self.connectToDb((err,connection) => {
          if(err) {
            return callback(true,"Error connecting to database");
          }
          callback(null,connection);
        });
      },
      function(connection,callback) {
        rethinkdb.table('login').insert(userData).run(connection,function(err,result) {
            connection.close();
            if(err) {
              return callback(true,"Error happens while adding new user");
            }
            callback(null,result);
        });
      }
    ],function(err,data) {
      callback(err === null ? false : true,data);
    });
  }
  
  
  
}



module.exports = db;
