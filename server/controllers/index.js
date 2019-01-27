var models = require('../models');
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'content-type': 'text/plain'
  };

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((messages)=>{
        res.writeHead(200, defaultCorsHeaders);
        res.end(JSON.stringify({results: messages}));
      })
    }, // a function which handles

    // a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body, (err, result)=>{
        if (err) {console.log(req.body)}
          res.json(result);
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get((username)=>{
        res.json(username);
      })
    },
    post: function (req, res) {
      models.users.post(req.body.username, (err, result)=>{
        if (err) {console.log(err)}
          res.json(result);
      });
    }
  }
};

