var db = require('../db');

var getUserId = function(username, callback){
  var selectQuery = `SELECT id FROM users WHERE username = '${username}';`;
  db.query(selectQuery, (err, data) => {
    if (err) {console.log(err)}
      else{
        if (data.length === 0) {
          var insertQuery = `INSERT INTO users (username) VALUES ('${username}');`
          db.query(insertQuery, (err, data) =>{
            if (err) {callback(err)}
              else {
                db.query(selectQuery, (err, data)=>{
                  if (err) {callback(err)}
                    else {
                      callback(data[0].id)
                    }
                })
              }
          })
        } else {
          callback(data[0].id);
        }
      }
  })
}
var getRoomId = function(roomname, callback){
  var selectQuery = `SELECT id FROM rooms WHERE roomname = '${roomname}';`;
  db.query(selectQuery, (err, data) => {
    if (err) {callback(err)}
      else{
        if (data.length === 0) {
          var insertQuery = `INSERT INTO rooms (roomname) VALUES ('${roomname}');`
          db.query(insertQuery, (err, data) =>{
            if (err) {callback(err)}
              else {
                db.query(selectQuery, (err, data)=>{
                  if (err) {callback(err)}
                    else {
                      callback(data[0].id)
                    }
                })
              }
          })
        } else {
          callback(data[0].id);
        }
      }
  })
}

module.exports = {
  messages: {
    get: function (callback) {
      var query = `SELECT messages.text, messages.id, rooms.roomname, users.username, messages.createdAt FROM users INNER JOIN (rooms INNER JOIN messages ON rooms.id = messages.roomsid) ON users.id = messages.userid;`
      db.query(query, (err, data) =>{
        if (err){
          callback(err);
        } else {
          callback(data);
        }
      })
    }, // a function which produces all the messages
    post: function (message, callback) {
      getUserId(message.username, (userId)=> {
        getRoomId(message.roomname,(roomId)=> {
          let insertSql = `INSERT INTO messages (text, roomsid, userid) VALUES ("${message.message}", ${roomId}, ${userId});`
          db.query(insertSql, (err, data) => {
            if (err) {
              callback(err);
            } else {
              callback(data);
            }
          })
        })
      })
      //check if roomname is in rooms table
      // if yes get the roomname id
      // else insert and then get roomname id
      // then insert into message and user_rooms tables
      // INSERT INTO messages (text, roomsid, userid) VALUES ('HELLO', 1, 1), ('secondmsg', 1, 1);

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      let selectSql = 'SELECT username FROM users;'
      db.query(selectSql, (err, data)=>{
        if (err){
          callback(err);
        } else {
          callback(null, data);
        }
      })
    },
    post: function (username, callback) {
      getUserId(username, ()=>{
        callback();
      })
    }
  }
};

// module.exports.users.get(console.log);

// var test3 = {
//   username: 'Freed',
//   roomname: 'Tesdt2',
//   text: 'Testingddd again',
// }
//  module.exports.messages.post(test3, console.log)
