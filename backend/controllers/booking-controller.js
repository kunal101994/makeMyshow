import mongoose from "mongoose";
import Bookings from "../models/Bookings.js";
export const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;


  let existingMovie;
  let existingUser;

  try {
     existingMovie = await Movie.findById(movie);
     existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }

  if(!existingMovie){
    return res.status(404).json({ message: "Invalid movie Id" });
  }

  if(!user){
    return res.status(404).json({ message: "Invalid user Id" });
  }

  let booking;

  try {
    booking = new Bookings({
      movie,
      date: new Date(date), 
        seatNumber, 
        user
    });

   const session = await mongoose.startSession();
   session.startTransaction();

   existingUser.bookings.push(booking);
   existingMovie.bookings.push(booking);
  // create a session
   // save the user
   await existingUser.save({ session });
   // save the movie
   await existingMovie.save({ session });
   // commit the transaction
   await booking.save({session});
   session.commitTransaction();
  } catch (error) {
    return console.log(error);
 return res.status(500).json({ message: "Internal server error" });
  }
  if(!booking){
    return res.status(500).json({ message: "Failed to create booking" });
  }

  return res.status(201).json({booking});
};


export const getBookingById = async (req, res, next) => {
  const id = req.params.id;
  let booking;

  try {
    booking = await Bookings.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if(!booking){
    return res.status(500).json({ message: "Unexpected ID Error" });
  }

  return res.status(200).json({ booking });
}


export const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;

  try {
    booking = await Bookings.findByIdAndDelete(id).populate("user movie");
    const session = await mongoose.startSession();
    session.startTransaction();
    await booking.user.bookings.pull(booking);
    await booking.movie.bookings.pull(booking);
    await booking.movie.save({session});
    await booking.user.save({session});
    session.commitTransaction();

  } catch (error) {
    return console.log(error);
  }
  if(!booking){
    return res.status(500).json({ message: "Booking not found" });
  }
  return res.status(200).json({ message: "Booking deleted successfully" });
}

