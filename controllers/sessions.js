const User = require('../models/user');

function sessionsNew(req, res){
  res.render('sessions/new');
}

function sessionsCreate(req, res){
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)){
        req.flash('danger', 'Unrecognised credentials');
        return res.status(401).render('sessions/new');
        // frm above test {message: 'unrecognised credentials'}
      }
      //storing userid in local session storage(server side locker?)
      req.session.userId = user.id;

      return res.redirect('/reviews');
    });
}

function sessionsDelete(req, res){
  return req.session.regenerate(() => res.redirect('/'));
}


module.exports = {
  new: sessionsNew,
  create: sessionsCreate,
  delete: sessionsDelete
};
