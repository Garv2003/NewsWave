import User from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const register = async (req, res) => {
  const { username, name, email, password } = req.body;
  console.log(req.body);
  try {
    const checkUser = await User.findOne({ $or: [{ username }, { email }] });
    console.log(checkUser);
    if (checkUser) {
      return res
        .status(400)
        .send({ message: "User already exists with this username or email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      name,
      email,
      password: hashedPassword,
    });
    res.send({ message: "Registration successful" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "Invalid username" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res
      .status(200)
      .send({ message: "Login successful", token: token, user: user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export { register, login };
