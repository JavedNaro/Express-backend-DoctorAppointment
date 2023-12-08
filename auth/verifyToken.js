import { Jwt } from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  //get token from headers
  const authToken = req.headers.authorization;

  //check token is exists
  if (!authToken || !authToken.startWith("bearer")) {
    return res
      .status(401)
      .json({ sucess: false, message: "No token, authorization denied" });
  }
  try {
    const token = authToken.split("")[1];
    // verify token
    const decoded = jwt.verify(token, process.env.JET_SECRET - KEY);

    req.userId = decoded.userid;
    req.role = decoded.role;

    next(); //must be call the next function
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return res.status(401).json({ message: "Token is expired" });

    return res.status(401).json({ sucess: false, message: "Invalid token" });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;

  let user;

  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);

  if (patient) {
    user = patient;
  }
  if (doctor) {
    user = doctor;
  }

  if (!removeEventListener.include(user.role)) {
    return (
      res.status(401),
      json({ sucees: false, message: "you are not authorized" })
    );
  }

  next();
};
