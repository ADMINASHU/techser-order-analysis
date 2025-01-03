// app/models/Data.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productType: { 
    type: String, 
    enum: ["ORDERED", "BUYBACK"] 
  },
  productCategory: { 
    type: String, 
    enum: ["UPS", "BATTERY", "RACK", "INVERTER", "SERVO", "OTHERS"] 
  },
  serialNo: String,
  rating: String,
  quantity: Number,
  warrantyStartDate: Date,
  warrantyEndDate: Date,
});

const PaymentSchema = new mongoose.Schema({
  paymentDate: { type: Date },
  paymentAmount: { type: Number },
  paymentDetails: { type: String },
  paymentStatus: { type: String, enum: ["PENDING", "COMPLETED", "FAILED"] },
  remarks: { type: String },
});

const OrderSchema = new mongoose.Schema({
  customerName: String,
  branchId: String,
  branchName: String,
  organization: String,
  customerPoNo: String,
  poDate: { type: Date },
  orderValue: { type: Number },
  orderFor: { type: String, enum: ["SYSTEM", "BATTERY", "SYSTEM & BATTERY", "RACK", "OTHERS"] },
  isBuybackAvailable: { type: String, enum: ["YES", "NO", ""] },
  buybackValue: { type: Number },
  warrantyPeriod: { type: String },
  indentNo: String,
  indentDate: Date,
  sapCode: String,
  atmId: String,
  state: String,
  deliveryAddress: String,
  pinCode: String,
  siteContactName: String,
  siteContactNumber: String,
  scheduledDispatchDate: Date,
  actualDispatchDate: Date,
  invoiceNo: String,
  invoiceDate: Date,
  invoiceValue: { type: Number },
  transporterDetails: String,
  docketNo: String,
  transporterContactDetails: String,
  plannedDeliveryDate: Date,
  actualDeliveryDate: Date,
  deliveryAcknowledgement: String,
  installationPlannedDate: Date,
  actualInstallationDate: Date,
  installationDoneBy: String,
  serialNo: String,
  installationReportNo: String,
  buybackCollected: { type: String, enum: ["YES", "NO", "PARTIALLY COLLECTED", ""] },
  buybackCollectedDate: Date,
  buybackDetailsWithQty: String,
  buybackSendToHoOrDisposedLocally: { type: String, enum: ["SENT_TO_HO", "DISPOSED_LOCALLY", ""] },
  localDisposalDetails: String,
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
  updatedBy: String,
  updatedAt: Date,

  // Products array
  products: [ProductSchema],

  // Payments array
  payments: [PaymentSchema],
});

// Add timestamps for created and updated
OrderSchema.pre('save', function(next) {
  if (this.isNew) {
    this.createdAt = new Date();
  }
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
