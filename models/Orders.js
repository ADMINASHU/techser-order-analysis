// app/models/Data.js
import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
  
});

export const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
