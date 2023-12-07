import User from "../models/UserSchema";
import Doctor from "../models/DoctorSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15d",
    }
  );
};

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    let user = null;

    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    //check if user exist
    if (!user) {
      return res.status(404).json({ message: "User already exist" });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }

    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "user successfully created" });
  } catch (err) {
    res.statsu(500).json({
      sucess: false,
      messsage: "internet server error, try again",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.boddy;
  try {
    let user = null;

    const patient = await User.findOne({ email });
    const Doctor = await Doctor.findOne({ email });

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctors;
    }
    //check if user exist or not
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    //comapre password
    const isPasswordMatch = await bcrypt.compare(
      req.user.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(404)
        .json({ status: false, message: "Invalid credentials" });
    }

    //get toke
    const token = generateToken;

    const { password, role, appointments, ...rest } = user._doc;

    res.status(404).json({
      status: true,
      message: "successfully login",
      token,
      data: { ...rest },
      role,
    });
  } catch (err) {
    res.status(500).json({ status: false.valueOf, message: "failed to login" });
  }
};
