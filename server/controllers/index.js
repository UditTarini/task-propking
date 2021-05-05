const User = require("../models/user");
const Land = require("../models/land");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const {validationResult} = require("express-validator");

exports.register = (req, res) => {
  const errors = validationResult(req);
  // checking for errors

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].param + " " + errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error:
          err.code === 11000
            ? "Name already exist"
            : "NOT able to save user in DB",
      });
    }

    res.json({
      name: user.name,
      id: user._id,
    });
  });
};

exports.login = (req, res) => {
  const {name, password} = req.body;
  console.log(name, password);
  User.findOne(
    {
      name,
    },
    (err, user) => {
      if (err || !user) {
        if (!user) {
          return res.status(400).json({
            error: "User doesn't not exist",
          });
        }
        return res.status(400).json({
          error: "Something went wrong",
        });
      }

      if (!user.authenticate(password)) {
        console.log("heyy");
        return res.status(401).json({
          error: "User and password do not match",
        });
      }

      // creating token and putting into cookies
      const auth_token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.SECRET
      );
      res.cookie("token", auth_token, {
        expire: new Date() * 100,
      });

      // sending to frontend
      const {_id, name} = user;
      return res.json({
        auth_token,
        user: {
          _id,
          name,
        },
      });
    }
  );
};

exports.signout = (req, res) => {
  res.clearCookie("auth_token");
  res.json({
    message: "signout",
  });
};

// FOR PROTECTED ROUTES
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

exports.isAuthenticated = (req, res, next) => {
  console.log(req.auth);
  let checker = req.auth;
  if (!checker) {
    return res.status(403).json({
      error: "Access denied",
    });
  }

  next();
};

// FOR LAND
exports.createLand = (req, res) => {
  const land = new Land(req.body);
  land.save((err, land) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error:
          err.code === 11000
            ? "Name already exist"
            : "NOT able to save user in DB",
      });
    }
    console.log("LAND", land);
    res.json({
      name: land.name,
      id: land._id,
    });
  });
};

exports.loadLand = async (req, res) => {
  let data;
  try {
    data = await Land.find({});
  } catch (error) {
    data = {error: "Can't get lands"};
  }
  res.json(data);
};

exports.updateLand = async (req, res) => {
  const result = await User.findOneAndUpdate(
    {
      _id: req.land._id,
    },
    {
      $set: req.body,
    },
    {multi: true}
  );
  if (result) {
    return res.status(200).json({message: "Land Updated Sucessfully", result});
  } else return res.status(400).json({message: "Failed Updating Land"});
};
