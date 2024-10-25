import express from "express";
import { getAllMovies, getMovieById, addMovie } from "../controllers/movie-controller.js";
const movieRouter = express.Router();


movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/", addMovie);

export default movieRouter;


