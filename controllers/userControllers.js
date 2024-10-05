//define the logic

const mockUsers = require("../data/users.json");
const jwt = require("jsonwebtoken");

const { registerModel, loginModel } = require("../models/userModel");

const registerUser = async (req, res) => {
  //joi validates the input
  const { error } = registerModel.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  //expecting these from the Body (can test in postman)
  const { username, email, password } = req.body;

  //check if there are duplicated users
  const userExists = mockUsers.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const id = mockUsers[mockUsers.length - 1].id + 1;

  //adds the new users to mocuUsers array
  mockUsers.push({ id, username, email, password });
  return res.status(201).json({ message: "User created" });
};

const loginUser = async (req, res) => {
  const { error } = loginModel.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;
  const user = mockUsers.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  //IF THE USER IS FOUND

  const secretKey = "thisismysecretlalallalalalallalalla";
   //the secretKey is a private password that only server knows to secure certain operations like encrypting data or verifying tokens
  const token = jwt.sign(
    {
      email: user.email,
      username: user.username,
    },
    secretKey,
    {
      expiresIn: "1h",
    }
  );
  //instead of saying "logged in successfully! Give a user a token"
  return res.status(200).json({ token });
};

// get the token of the user, get the information out of the token
const getUserProfile = async (req, res) => {
  res.send(`Username: ${req.user.username} Email: ${req.user.email}`);
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
