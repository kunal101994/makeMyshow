import jwt from "jsonwebtoken";
import Movie from "../models/Movie.js";
import mongoose from "mongoose";

export const addMovie = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1]; // Bearer Token
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token Not Found" });
  }

  let adminId;

  //verify token
  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  // create new movie
  // destructure
  const { title, description, releaseDate, posterUrl, featured } = req.body;

  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() == "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let movie;
  try {
      movie = new Movie({
        description, 
        releaseDate: new Date(`${releaseDate}`), 
        featured, 
        actors,
        admin: adminId,
        posterUrl,
        title, 
    })
        movie = await movie.save();
  } catch (error) {
      console.log(error);
  }

  if(!movie){
    return res.status(500).json({ message: "Unable to store movie" });
  }

  return res.status(201).json({movie});


};


export const getAllMovies = async ( req, res, next) => {
  let movies;

  try {
    movies = await Movie.find();
  } catch (error) {
    return console.log(error);
  }
  
  if(!movies){
    return res.status(500).json({ message: "No movies found" });
  }
  return res.status(200).json({ movies });
};


export const getMovieById = async (req, res, next) => {
  const id = req.params.id;
  let movie;

  try {
    movie = await Movie.findById(id);
  } catch (error) {
    return console.log(error);
  }

  if(!movie){
    return res.status(404).json({ message: "Invalid movie Id" });
  }

  return res.status(200).json({ movie });
}


