import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6 // Correcting this to set a minimum length, usually a number is expected
    },
    bookings: [{
        type: mongoose.Types.ObjectId,
        ref: "Booking"
    }]
}, { timestamps: true });

// Correcting the export statement
const User = mongoose.model("User", userSchema);
export default User;

