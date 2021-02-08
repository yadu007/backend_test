'use strict';

let mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  User = require('../models/users'),
  logger = require('../lib/logger')

exports.register = async function (req, res) {
  let check_user = await User.find({email:req.body.email})
  if(check_user && check_user.length){
    return res.status(400).send({
      message: "User Already Present"
    });
  }
  let newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function (err, user) {
    if (err) {
      logger.error("Error On Creating User ",err)
      return res.status(400).send({
        message: err
      });
    } else {
      user.hash_password = undefined;
      return res.json(user);
    }
  });
};

exports.sign_in = function (req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) {
      logger.error("Error On Finding User")
    } err;
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({
        message: 'Authentication failed. Invalid user or password.'
      });
    }
    return res.json({
      token: jwt.sign({
        email: user.email,
        fullName: user.fullName,
        _id: user._id
      }, 'RESTFULAPIs')
    });
  });
};

exports.loginRequired = function (req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
      if (err) {
        return res.status(401).json({
          message: 'Unauthorized user!!'
        });
      }
      req.user = decode;
      next();
    });
  } else {
    return res.status(401).json({
      message: 'Unauthorized user!!'
    });
  }

};

