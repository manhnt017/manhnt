import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    size: String,
    deal: String,
    status: {
      type: String,
      enum: ["OK", "50/50", "Chưa OK"],
      default: "Chưa OK",
    },
    phone: String,
    googleMap: String,
    note: String,
    date: String,
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
