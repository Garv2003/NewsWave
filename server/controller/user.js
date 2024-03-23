import User from "../model/user.js";
import SavedNews from "../model/savednews.js";

async function getUser(req, res) {
  try {
    const user = await User.findById(req.user.id);
    res.send(user);
  } catch (err) {
    res.code(500).send({ message: "Server Error" });
  }
}
