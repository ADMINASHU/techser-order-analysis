// app/models/Data.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customerName: String,
  branchId: String,
  branchName: String,
  organization: String,
  customerPoNo: String,
  poDate: { type: Date },
  orderValue: { type: Number }, // New field
  orderFor: { type: String, enum: ["SYSTEM", "BATTERY", "SYSTEM & BATTERY", "RACK", "OTHERS"] },
  isBuybackAvailable: { type: String, enum: ["YES", "NO", ""] },
  buybackValue: { type: Number }, // New field
  warrantyPeriod: { type: String }, // New field
  indentNo: String,
  indentDate: Date,
  sapCode: String,
  atmId: String,
  state: String,
  deliveryAddress: String,
  pinCode: String,
  siteContactName: String,
  siteContactNumber: String,
  systemDescription: String,
  systemQuantity: Number,
  batteryDescription: String,
  batteryQuantity: Number,
  buybackDescription: String,
  buybackQuantity: Number,
  scheduledDispatchDate: Date,
  actualDispatchDate: Date,
  invoiceNo: String,
  invoiceDate: Date,
  invoiceValue: { type: Number }, // New field
  transporterDetails: String,
  docketNo: String,
  transporterContactDetails: String,
  plannedDeliveryDate: Date,
  actualDeliveryDate: Date,
  deliveryAcknowledgement: String, // New field
  installationPlannedDate: Date,
  actualInstallationDate: Date,
  installationDoneBy: String,
  serialNo: String,
  installationReportNo: String,
  buybackCollected: { type: String, enum: ["YES", "NO", "PARTIALLY COLLECTED", ""] }, // Updated field
  buybackCollectedDate: Date, // Updated field name
  buybackDetailsWithQty: String,
  buybackSendToHoOrDisposedLocally: { type: String, enum: ["SENT_TO_HO", "DISPOSED_LOCALLY", ""] }, // New field
  localDisposalDetails: String, // New field
  paymentStatus: { type: String, enum: ["COMPLETED", "PENDING", "PARTIAL RECEIVED", ""] },
  lastPaymentReceivedDate: Date,
  paymentAmount: Number,
  paymentDetails: String,
  remarks: String,
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
  updatedBy: String,
  updatedAt: Date,
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
