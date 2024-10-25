import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return console.log(error);
    return res.status(500).json({ message: "Server error" });
  }

  if (!users) {
    return res.status(500).json({ message: "No users found" });
  }

  return res.status(200).json({ users });
};

// User signup
export const signup = async (req, res, next) => {
  // destructure 
  const { name, email, password } = req.body;

  // Improved input validation for name, email, and password
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() == ""
  ) {
    return res.status(422).json({ message: "Invalid Inputes" });
  }

  const hashedPassword = bcrypt.hashSync(password);

  let user;
  try {
    user = new User({ name, email, password: hashedPassword });
    user = await user.save();
  } catch (error) {
    return console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  // validation checks
  if (!user) {
    return res.status(404).json({ message: "Candidate not found" });
  }
  return res.status(201).json({ user });
};

//user Id
export const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, password } = req.body;

    // Improved input validation for name, email, and password
    if (
      !name &&
      name.trim() === "" &&
      !email &&
      email.trim() === "" &&
      !password &&
      password.trim() == ""
    ) {
      return res.status(422).json({ message: "Invalid Inputes" });
    }
    const hashedPassword = bcrypt.hashSync(password);

    let user;
    try {
        user = await User.findByIdAndUpdate(id, {name, email, password: hashedPassword});
    } catch (error) {
        console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
    }
    if(!user) {
        return res.status(500).json({ message: "something went wrong" });
    }
    res.status(200).json({message:"Updated Successfully"})
};


export const deleteUser = async(req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    // valuation check
    if(!user) {
        return res.status(500).json({ message: "User not found" });
    }
    return res.status(200).json({users})
} 


export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Improved input validation for name, email, and password
  if (
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() == ""
  ) {
    return res.status(422).json({ message: "Invalid Inputes" });
  }

  let existingUser;
  try {
     existingUser = await User.findOne({email});
  } catch (error) {
       console.log(error);
  }

  if(!existingUser){
    return res.status(404).json({message: "Unable to find user from this ID"});
  }
     
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if(!isPasswordCorrect){
    return res.status(400).json({message: "Incorrect Paaword"});
  }
  return res.status(200).json({message: "Login Successfull"})
};


export const getBookingsOfUser  = async (req, res, next) => {
  const id = req.params.id;
  let bookings;
  try {
    bookings = await bookings.find({user: id});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
  if(!bookings) {
    return res.status(500).json({ message: "No bookings found" });
  }

  return res.status(200).json({ bookings });
}


