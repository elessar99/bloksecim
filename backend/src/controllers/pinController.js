const User = require("../models/userModel");

async function addPinToUsers(req, res) {
  try {
    const { pin } = req.body;
    const trimmedPin = pin.trim();
    const splittedPin = trimmedPin.split("-");
    const allUsers = await User.find();

    if (allUsers.length === 0) {
      return res.status(404).json({ message: "No users." });
    }

    for (const user of allUsers) {
      if (
        user.categories?.length > 0 &&
        user.categories.includes(splittedPin[0])
      ) {
        user.pinList.push(trimmedPin);
        await user.save();
      }
    }

    return res.status(201).json({
      message: "Pin was added to user pinlist successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = addPinToUsers;
