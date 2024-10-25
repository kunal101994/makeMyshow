import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  // validation check

  if (!email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputes" });
  }

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (error) {
    return res.status(500).json({ message: "Error checking existing admin" });
  }

  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exists" });
  }
  
  const hashedPassword = await bcrypt.hashSync(password);

  let admin;
  // const hashedPassword = await bcrypt.hashSync(password);
  try {
    // new adnmin
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
  } catch (error) {
    return console.log(error);
  }
  if (!admin) {
    return res.status(500).json({ message: "Unable to store admin" });
  }

  return res.status(201).json({ admin });
};

// Login Admin
export const adminLogin = async (req, res, next) => {
    const { email, password } = req.body;
  if (!email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputes" });
  }

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (error) {
    return console.log(error);
  }

  if (!existingAdmin) {
    return res.status(401).json({ message: "Admin not found" });
  }

  const isPasswordCorrect = await bcrypt.compareSync(
    password,
    existingAdmin.password
  );
  
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Incorrect Password" });
  }

  // declare token

  const token = jwt.sign({id: existingAdmin._id}, process.env.SECRET_KEY,{
    expiresIn: '100d'  // 1 hour token
  });

  return res.status(200).json({ message: "Login Successful" , token, id: existingAdmin._id});
};


export const getAdmins = async (req, res, next) => {
    
  let admins;

  try {
     admins = await Admin.find();
  } catch (error) {
      return console.log(error);
  } 

  if(!admins) {
    return res.status(500).json({ message: "No admins found" });
  }
  return res.status(200).json({ admins });
}


