const User = require("../models/userModel");

async function addCategory(req, res) {
  try {
    const { category } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: res.locals.user._id },
      { $push: { categories: category } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User could not be updated!" });
    }

    return res
      .status(201)
      .json({
        message: "Category was added to user sucessfully.",
        user: updatedUser,
      });
  } catch (error) {
    console.log(error);
    console.log("Error in adding category.");
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function deletePin(req, res) {
  try {
    const { pin } = req.body;
    const { user } = res.locals;

    user.pinList = user.pinList.filter(userPin => userPin !== pin);
    const updatedUser = await user.save();

    if (!updatedUser) {
      return res.status(404).json({ message: "User could not be updated!" });
    }

    return res.status(200).json({
      message: "Pin was deleted from user's pinList successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = {
  deletePin,
  addCategory
};
