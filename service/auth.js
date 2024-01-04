const jwt = require("jsonwebtoken");
const secret = "Aditya$123@$";

// const sessionIdToUserMap = new Map(); // in this we were maintaining state but now we will be using jwt

function setUser(user) {
  // this function will make tokens for us
  //   sessionIdToUserMap.set(id, user);
  //    const payload = {
  //     ...user
  //    }
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret
  ); // secret is same as that of stamp
} // we are directly passing user as payload

// function getUser(token) {
//   if (!token) return null;
//   //   return sessionIdToUserMap.get(id);
//   return jwt.verify(token, secret); // verification of the token using secret key
// }

function getUser(token) {
  if (!token) return null;
  try {
    console.log("Token received for verification:", token);
    return jwt.verify(token, secret); // verification of the token using secret key
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return null; // or handle the error as appropriate
  }
}

module.exports = {
  setUser,
  getUser,
};
