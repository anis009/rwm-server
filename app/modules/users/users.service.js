import User from "./users.model.js";

const createUser = async (user) => {
  const newUser = new User(user);
  const savedUser = await newUser.save();
  return savedUser;
};

const deleteUser = async (userId) => {
  const deletedUser = await User.findOneAndDelete({ userId });
  return deletedUser;
};

const updateUser = async (userId, updatedData) => {
  const updatedUser = await User.findOneAndUpdate({ userId }, updatedData, {
    new: true,
  });
  return updatedUser;
};

const getUserById = async (userId) => {
  const user = await User.findOne({ userId });
  return user;
};
const checkEmailExists = async (email) => {
  const user = await User.findOne({ email });
  return user;
};
const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};
const getUserByPhoneNumber = async (phoneNumber) => {
  const user = await User.findOne({ phoneNumber });
  return user;
};
const checkPhoneNumberExists = async (phoneNumber) => {
  const user = await User.findOne({ phoneNumber });
  return user;
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

export const UserServices = {
  createUser,
  deleteUser,
  updateUser,
  getUserById,
  getAllUsers,
  checkEmailExists,
  getUserByEmail,
  getUserByPhoneNumber,
  checkPhoneNumberExists,
};
