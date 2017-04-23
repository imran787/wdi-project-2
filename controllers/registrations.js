const User = require('../models/user');


function registrationNew(req, res){
  return res.render('registrations/new');
}

function registrationCreate(req, res){
  User
    .create(req.body)
    .then((user) => {
      req.flash('info', `Thank you for registering, ${user.username}! please login.`);
      return res.redirect('/login');
    })
    .catch((err) => {
      if(err.name === 'ValidationError'){
        return res.status(500).render('registrations/new', {message: 'Passwords do not match'});
      }
      res.status(500).end();
    });

}

module.exports = {
  new: registrationNew,
  create: registrationCreate
};
