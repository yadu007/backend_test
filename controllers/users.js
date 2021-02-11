'use strict';

let mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  User = require('../models/users'),
  logger = require('../lib/logger')

exports.register = async function (req, res) {
  let check_user = await User.find({
    email: req.body.email
  })
  if (check_user && check_user.length) {
    return res.status(400).send({
      message: "User Already Present"
    });
  }
  let newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  try {
    let user = await newUser.save()
    user.hash_password = undefined;
    return res.json(user);
  } catch (error) {
    logger.error("Error On Creating User ", error)
    return res.status(400).send({
      message: err
    });
  }
};

exports.sign_in = async function (req, res) {
  try {
    let user = await User.findOne({
      email: req.body.email
    })
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
  } catch (error) {
    logger.error("Error On Finding User")
    return res.status(401).json({
      message: 'Error On Finding User'
    });
  }

};

exports.loginRequired = async function (req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    try {
      let jwt_verify = await jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs');
      req.user = jwt_verify;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Unauthorized user!!'
      });
    }

  } else {
    return res.status(401).json({
      message: 'Unauthorized user!!'
    });
  }

};