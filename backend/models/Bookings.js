import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    seatNumber: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;



