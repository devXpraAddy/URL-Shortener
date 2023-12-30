const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

const User = require("../models/user");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/"); // we could have sent json but we are using EJS to we are rendering home
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password,
  });
  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);

  return res.redirect("/"); // we could have sent json but we are using EJS to we are rendering home
}

module.exports = { handleUserSignup, handleUserLogin };
