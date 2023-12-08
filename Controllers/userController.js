import User from "../models/UserSchema";

export const updateUser = async (req, res) => {
  const id = req.parent.id;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updateUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, messsage: "Failed to update" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.parent.id;

  try {
    const updateUser = await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
      data: updateUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, messsage: "Failed to delete" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.parent.id;

  try {
    const user = await User.findById(id).select("-password");

    res.status(200).json({
      success: true,
      message: "user found",
      data: user,
    });
  } catch (err) {
    res.status(404).json({ success: false, messsage: "no user found" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.findBy({}).select("-password");

    res.status(200).json({
      success: true,
      message: "Users found",
      data: users,
    });
  } catch (err) {
    res.status(404).json({ success: false, messsage: "no found" });
  }
};
