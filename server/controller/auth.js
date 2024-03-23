import User from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  const { username, name, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ $or: [{ username }, { email }] });
    if (checkUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res.status(404).json({ error: "Invalid username" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { register, login };
