const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../models");
const User = db.User;

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body
  const hash_password = await bcrypt.hash(password, 10);
  const userObj = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    hash_password: hash_password,
    role: role
  }
  const existUser = await User.findAll({
    where: {
      email: email
    }
  })
  if (existUser.length > 0) {
    return res.status(201).json({
      message: 'User already created',
      user: existUser
    })
  } else {
    User.create(userObj)
    .then(data => {
      const token = generateJwtToken(data.id, data.role)
      return res.status(201).json({
        message: 'Successfully user added',
        user: data,
        token: token
      })
    })
    .catch(err => {
      return res.status(400).json({
        message: err.message
      })
    })
  }
}

exports.signin = async (req, res) => {
  const existUser = await User.findOne({
    where: {
      email: req.body.email
    }
  })
  if (existUser) {
    const hash_password =  existUser.dataValues.hash_password
    const role = existUser.dataValues.role

    const isPassword = await bcrypt.compare(req.body.password, hash_password);
    console.log(isPassword)

    if (isPassword) {
      const token = generateJwtToken(existUser.dataValues.id, role)
      res.status(200).json({
        message: 'Successfully logged',
        user: existUser,
        token: token
      })
    } else {
      res.status(400).json({
      message: 'User does not exists'
      })
    }
  }
}

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};