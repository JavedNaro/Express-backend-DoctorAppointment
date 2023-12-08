import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";

// get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewSchema.find({});
    res
      .status(200)
      .json({ sucees: true, message: "Successful", data: reviews });
  } catch (err) {
    res.status(404).json({ sucees: false, message: "Not found" });
  }
};

// create review
export const createReview = async (req, res) => {
  if (!req.body.doctore) req.body.doctor = req.params.doctorId;
  if (!req.body.user) req.body.user = req.userId;

  const newReview = new ReviewSchema(req.body);
  try {
    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: saveReview._id },
    });

    res
      .status(200)
      .json({ success: true, message: "Review submitted", data: savedReview });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
