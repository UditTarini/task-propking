var express = require("express");
var router = express.Router();
var {
  register,
  login,
  isSignedIn,
  isAuthenticated,
  signout,
  createLand,
  loadLand,
  updateLand,
} = require("../controllers");
const {check} = require("express-validator");
const User = require("../models/user");
const Land = require("../models/land");

// ......... routes .........
// FOR USER
router.post(
  "/register",
  [
    // validation
    check("name")
      .isLength({min: 3})
      .withMessage("must be at least 3 chars long"),
    check("email").isEmail().withMessage("not valid"),
    check("password")
      .isLength({min: 8})
      .withMessage("must be at least 8 chars long")
      .matches(/\d/)
      .withMessage("must contain a number")
      .matches(/[A-Z]+/)
      .withMessage("must contain a capital letter")
      .matches(/[*@!#%&()^~{}]+/)
      .withMessage("must contain a special char"),
  ],
  register
);

router.post("/login",  [
  // validation
  check("email").isEmail().withMessage("not valid"),
  check("password")
    .isLength({
      min: 8,
    })
    .withMessage("field is required"),
], login);

router.get("/signout", signout);


// FOR LAND
router.post("/land/create",isSignedIn,isAuthenticated, createLand);

router.get("/land/all", loadLand);


router.put("/land/:landId",isSignedIn,isAuthenticated, updateLand);

module.exports = router;
