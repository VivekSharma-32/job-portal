import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  // validate
  if (!name) {
    next("Name is required");
  }
  if (!email) {
    next("Email is required");
  }
  if (!password) {
    next("Password is required and must be 6 characters long");
  }

  // existing user
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    next("Email already exists ! Please login");
  }
  const user = await userModel.create({ name, email, password });
  res.status(201).send({
    success: true,
    message: "User created successfully",
    user,
  });
};
