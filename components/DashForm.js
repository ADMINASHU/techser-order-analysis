"use client";

import { useState, useCallback } from "react";
import styles from "./DashForm.module.css";

const DashForm = ({ department, level, isAdmin, onClose, initialData = {} }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    slNo: "",
    customerName: "",
    branchId: "",
    branchName: "",
    organization: "",
    customerPoNo: "",
    poDate: "",
    orderFor: "",
    isBuybackAvailable: "",
    indentNo: "",
    indentDate: "",
    sapCode: "",
    atmId: "",
    state: "",
    deliveryAddress: "",
    pinCode: "",
    siteContactName: "",
    siteContactNumber: "",
    systemDescription: "",
    systemQuantity: "",
    batteryDescription: "",
    batteryQuantity: "",
    buybackDescription: "",
    buybackQuantity: "",
    scheduledDispatchDate: "",
    actualDispatchDate: "",
    invoiceNo: "",
    invoiceDate: "",
    deliveryChallanNo: "",
    deliveryChallanDate: "",
    transporterDetails: "",
    docketNo: "",
    transporterContactDetails: "",
    plannedDeliveryDate: "",
    actualDeliveryDate: "",
    installationPlannedDate: "",
    actualInstallationDate: "",
    installationDoneBy: "",
    serialNo: "",
    installationReportNo: "",
    buybackReceived: "",
    buybackReceivedDate: "",
    receivedBuybackDetailsWithQty: "",
    paymentStatus: "",
    lastPaymentReceivedDate: "",
    paymentAmount: "",
    paymentDetails: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = useCallback(() => {
    const requiredFields = ['customerName', 'customerPoNo', 'orderFor'];
    const errors = {};

    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = 'This field is required';
      }
    });

    if (Object.keys(errors).length > 0) {
      setError('Please fill in all required fields');
      return false;
    }
    return true;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: initialData?._id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(initialData?._id ? { ...formData, id: initialData._id } : formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSuccessMessage(initialData?._id ? "Order updated successfully!" : "Order created successfully!");
      setTimeout(() => onClose(), 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const canViewSection = (section) => {
    if (isAdmin) return true;

    const permissions = {
      customerInfo: ["Sales", "Marketing"],
      orderDetails: ["Sales", "Marketing"],
      deliveryInfo: ["Logistic", "Service"],
      installationInfo: ["Service"],
      paymentInfo: ["Accounts"],
    };

    return permissions[section]?.includes(department);
  };

  return (
    <div className={styles.formWrapper}>
      {error && <div className={styles.error}>{error}</div>}
      {successMessage && <div className={styles.success}>{successMessage}</div>}
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formFields}>
          {/* Customer Information Section */}
          {canViewSection("customerInfo") && (
            <>
              <h3 className={styles.sectionHeader}>Customer Information</h3>
              <div className={styles.formGroup}>
                <label className={styles.label}>SL No</label>
                <input
                  type="text"
                  name="slNo"
                  value={formData.slNo}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              {/* Restore the rest of the customer info fields */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Branch ID</label>
                <input
                  type="text"
                  name="branchId"
                  value={formData.branchId}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Branch Name</label>
                <input
                  type="text"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Organization</label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Customer PO No</label>
                <input
                  type="text"
                  name="customerPoNo"
                  value={formData.customerPoNo}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>PO Date</label>
                <input
                  type="date"
                  name="poDate"
                  value={formData.poDate}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Order For</label>
                <input
                  type="text"
                  name="orderFor"
                  value={formData.orderFor}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Is Buyback Available</label>
                <select
                  name="isBuybackAvailable"
                  value={formData.isBuybackAvailable}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="">Select</option>
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Indent No</label>
                <input
                  type="text"
                  name="indentNo"
                  value={formData.indentNo}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Indent Date</label>
                <input
                  type="date"
                  name="indentDate"
                  value={formData.indentDate}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>SAP Code</label>
                <input
                  type="text"
                  name="sapCode"
                  value={formData.sapCode}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>ATM ID</label>
                <input
                  type="text"
                  name="atmId"
                  value={formData.atmId}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Delivery Address</label>
                <input
                  type="text"
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Pin Code</label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Site Contact Name</label>
                <input
                  type="text"
                  name="siteContactName"
                  value={formData.siteContactName}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Site Contact Number</label>
                <input
                  type="text"
                  name="siteContactNumber"
                  value={formData.siteContactNumber}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
            </>
          )}

          {/* Order Details Section */}
          {canViewSection("orderDetails") && (
            <>
              <h3 className={styles.sectionHeader}>Order Details</h3>
              {/* Restore order details fields */}
              <div className={styles.formGroup}>
                <label className={styles.label}>System Description</label>
                <input
                  type="text"
                  name="systemDescription"
                  value={formData.systemDescription}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>System Quantity</label>
                <input
                  type="number"
                  name="systemQuantity"
                  value={formData.systemQuantity}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Battery Description</label>
                <input
                  type="text"
                  name="batteryDescription"
                  value={formData.batteryDescription}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Battery Quantity</label>
                <input
                  type="number"
                  name="batteryQuantity"
                  value={formData.batteryQuantity}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Buyback Description</label>
                <input
                  type="text"
                  name="buybackDescription"
                  value={formData.buybackDescription}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Buyback Quantity</label>
                <input
                  type="number"
                  name="buybackQuantity"
                  value={formData.buybackQuantity}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Scheduled Dispatch Date</label>
                <input
                  type="date"
                  name="scheduledDispatchDate"
                  value={formData.scheduledDispatchDate}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Actual Dispatch Date</label>
                <input
                  type="date"
                  name="actualDispatchDate"
                  value={formData.actualDispatchDate}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Invoice No</label>
                <input
                  type="text"
                  name="invoiceNo"
                  value={formData.invoiceNo}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Invoice Date</label>
                <input
                  type="date"
                  name="invoiceDate"
                  value={formData.invoiceDate}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Delivery Challan No</label>
                <input
                  type="text"
                  name="deliveryChallanNo"
                  value={formData.deliveryChallanNo}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Delivery Challan Date</label>
                <input
                  type="date"
                  name="deliveryChallanDate"
                  value={formData.deliveryChallanDate}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Transporter Details</label>
                <input
                  type="text"
                  name="transporterDetails"
                  value={formData.transporterDetails}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Docket No</label>
                <input
                  type="text"
                  name="docketNo"
                  value={formData.docketNo}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Transporter Contact Details</label>
                <input
                  type="text"
                  name="transporterContactDetails"
                  value={formData.transporterContactDetails}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Planned Delivery Date</label>
                <input
                  type="date"
                  name="plannedDeliveryDate"
                  value={formData.plannedDeliveryDate}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Actual Delivery Date</label>
                <input
                  type="date"
                  name="actualDeliveryDate"
                  value={formData.actualDeliveryDate}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
            </>
          )}

          {/* Delivery Information Section */}
          {canViewSection("deliveryInfo") && (
            <>
              <h3 className={styles.sectionHeader}>Delivery Information</h3>
              {/* Restore delivery info fields */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Installation Planned Date</label>
                <input
                  type="date"
                  name="installationPlannedDate"
                  value={formData.installationPlannedDate}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Actual Installation Date</label>
                <input
                  type="date"
                  name="actualInstallationDate"
                  value={formData.actualInstallationDate}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Installation Done By</label>
                <input
                  type="text"
                  name="installationDoneBy"
                  value={formData.installationDoneBy}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Serial No</label>
                <input
                  type="text"
                  name="serialNo"
                  value={formData.serialNo}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Installation Report No</label>
                <input
                  type="text"
                  name="installationReportNo"
                  value={formData.installationReportNo}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Buyback Received</label>
                <select
                  name="buybackReceived"
                  value={formData.buybackReceived}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="">Select</option>
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Buyback Received Date</label>
                <input
                  type="date"
                  name="buybackReceivedDate"
                  value={formData.buybackReceivedDate}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Received Buyback Details with Qty</label>
                <input
                  type="text"
                  name="receivedBuybackDetailsWithQty"
                  value={formData.receivedBuybackDetailsWithQty}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
            </>
          )}

          {/* Installation Information Section */}
          {canViewSection("installationInfo") && (
            <>
              <h3 className={styles.sectionHeader}>Installation Information</h3>
              {/* Restore installation info fields */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Last Payment Received Date</label>
                <input
                  type="date"
                  name="lastPaymentReceivedDate"
                  value={formData.lastPaymentReceivedDate}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Payment Amount</label>
                <input
                  type="number"
                  name="paymentAmount"
                  value={formData.paymentAmount}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Payment Details</label>
                <input
                  type="text"
                  name="paymentDetails"
                  value={formData.paymentDetails}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Remarks</label>
                <input
                  type="text"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
            </>
          )}

          {/* Payment Information Section */}
          {canViewSection("paymentInfo") && (
            <>
              <h3 className={styles.sectionHeader}>Payment Information</h3>
              <div className={styles.formGroup}>
                <label className={styles.label}>Payment Status</label>
                <select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="">Select</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="PENDING">Pending</option>
                  <option value="PARTIAL RECEIVED">Partial Received</option>
                </select>
              </div>
              {/* Restore other payment fields */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Last Payment Received Date</label>
                <input
                  type="date"
                  name="lastPaymentReceivedDate"
                  value={formData.lastPaymentReceivedDate}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Payment Amount</label>
                <input
                  type="number"
                  name="paymentAmount"
                  value={formData.paymentAmount}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Payment Details</label>
                <input
                  type="text"
                  name="paymentDetails"
                  value={formData.paymentDetails}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Remarks</label>
                <input
                  type="text"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
            </>
          )}

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            <button type="button" className={styles.closeButton} onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DashForm;
