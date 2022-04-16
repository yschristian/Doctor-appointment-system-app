import mongoose from "mongoose";
const bookSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Patient",
    },
    appoint: {
      type: mongoose.Schema.ObjectId,
      ref: "Appoint",
    },
    status: {
      type: String,
      enum: ["pending", "accepted"],
      default: "pending",
    },
    
  },
  {
    timestamps: true,
  }
);
bookSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email  phone",
  }).populate({
    path: "appoint",
  });
  next();
})
const Book = mongoose.model("Book", bookSchema);
export default Book;
