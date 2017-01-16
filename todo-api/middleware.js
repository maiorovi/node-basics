module.exports = function(db) {
    return {
      requireAuthentication: function(req, res, next) {
          var token = req.header('Auth');
          db.user.findByToken(token).then((user) => {
              req.user = user;
              next();
          }, (e) => {
              res.status(401).send();
          });


      }
    };
};
