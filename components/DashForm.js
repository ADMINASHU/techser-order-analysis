"use client";

import { useState, useCallback, useEffect } from "react";
import styles from "./DashForm.module.css";
import ProductDetails from "./ProductDetails";
import PaymentDetails from "./PaymentDetails";

const DashForm = ({ department, level, isAdmin, onClose, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    customerName: "",
    branchId: "",
    branchName: "",
    organization: "",
    customerPoNo: "",
    poDate: "",
    orderValue: "", // New field
    orderFor: "",
    isBuybackAvailable: "",
    buybackValue: "", // New field
    warrantyPeriod: "", // New field
    indentNo: "",
    indentDate: "",
    sapCode: "",
    atmId: "",
    state: "",
    deliveryAddress: "",
    pinCode: "",
    siteContactName: "",
    siteContactNumber: "",
    scheduledDispatchDate: "",
    actualDispatchDate: "",
    invoiceNo: "",
    invoiceDate: "",
    invoiceValue: "", // New field
    transporterDetails: "",
    docketNo: "",
    transporterContactDetails: "",
    plannedDeliveryDate: "",
    actualDeliveryDate: "",
    deliveryAcknowledgement: "", // New field
    installationPlannedDate: "",
    actualInstallationDate: "",
    installationDoneBy: "",
    serialNo: "",
    installationReportNo: "",
    buybackCollected: "", // Updated field
    buybackCollectedDate: "", // Updated field
    buybackDetailsWithQty: "",
    buybackSendToHoOrDisposedLocally: "", // New field
    localDisposalDetails: "", // New field
    products: [], // Initialize as empty array
    payments: [], // Initialize as empty array for payments
  });

  // Modified useEffect to safely handle initialData
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      const formattedData = Object.keys(initialData).reduce((acc, key) => {
        if (key === "products") {
          // Safely handle products array
          acc[key] = Array.isArray(initialData[key]) ? initialData[key] : [];
        } else if (key === "payments") {
          // Safely handle payments array
          acc[key] = Array.isArray(initialData[key]) ? initialData[key] : [];
        } else if (initialData[key] === null || initialData[key] === undefined) {
          // Handle null/undefined values
          acc[key] = "";
        } else if (key.toLowerCase().includes("date") && initialData[key]) {
          // Handle date fields
          try {
            acc[key] = new Date(initialData[key]).toISOString().split("T")[0];
          } catch (e) {
            acc[key] = "";
          }
        } else {
          // Handle all other fields
          acc[key] = initialData[key].toString();
        }
        return acc;
      }, {});

      setFormData((prev) => ({
        ...prev,
        ...formattedData,
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    // Validate products if needed
    if (formData.products.length === 0) {
      setError("Please add at least one product");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: initialData?._id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          id: initialData?._id,
          // Include any additional metadata if needed
          updatedAt: new Date(),
          updatedBy: "current_user", // Replace with actual user info
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSuccessMessage(
        initialData?._id ? "Order updated successfully!" : "Order created successfully!"
      );
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
      {/* {error && <div className={styles.error}>{error}</div>}
      {successMessage && <div className={styles.success}>{successMessage}</div>} */}
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formFields}>
          {/* Order Details Section */}
          {canViewSection("orderDetails") && (
            <>
              <h3 className={styles.sectionHeader}>Order Details</h3>
              <div className={styles.formGroup}>
                <label className={styles.label}>Order For</label>
                <select
                  name="orderFor"
                  value={formData.orderFor}
                  onChange={handleChange}
                  className={styles.input}
                >
                  <option value="">Select</option>
                  <option value="SYSTEM">SYSTEM</option>
                  <option value="BATTERY">BATTERY</option>
                  <option value="SYSTEM & BATTERY">SYSTEM & BATTERY</option>
                  <option value="RACK">RACK</option>
                  <option value="OTHERS">OTHERS</option>
                </select>
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
                <label className={styles.label}>Order Value</label>
                <input
                  type="number"
                  name="orderValue"
                  value={formData.orderValue}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              {formData.isBuybackAvailable === "YES" && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>Buyback Value</label>
                  <input
                    type="number"
                    name="buybackValue"
                    value={formData.buybackValue}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
              )}
            </>
          )}

          {/* Customer Information Section */}
          {canViewSection("customerInfo") && (
            <>
              <h3 className={styles.sectionHeader}>Customer Information</h3>
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
          {/* Product Details Section */}
          {canViewSection("productDetails") && (
            <ProductDetails formData={formData} setFormData={setFormData} />
          )}
          {/* Indent and Invoice Information Section */}
          {canViewSection("IndentInvoiceInfo") && (
            <>
              <h3 className={styles.sectionHeader}>Indent and Invoice Information</h3>

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
                <label className={styles.label}>Invoice Value</label>
                <input
                  type="number"
                  name="invoiceValue"
                  value={formData.invoiceValue}
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

              <div className={styles.formGroup}>
                <label className={styles.label}>Delivery Acknowledgement</label>
                <input
                  type="text"
                  name="deliveryAcknowledgement"
                  value={formData.deliveryAcknowledgement}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
            </>
          )}

          {/* Installation Information Section */}
          {canViewSection("installationInfo") && (
            <>
              <h3 className={styles.sectionHeader}>
                {formData.isBuybackAvailable === "YES"
                  ? `Installation and Buyback Information`
                  : `Installation Information`}
              </h3>
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
                <label className={styles.label}>Installation Report No</label>
                <input
                  type="text"
                  name="installationReportNo"
                  value={formData.installationReportNo}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              {formData.isBuybackAvailable === "YES" && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>Buyback Collected</label>
                  <select
                    name="buybackCollected"
                    value={formData.buybackCollected}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="">Select</option>
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
                    <option value="PARTIALLY COLLECTED">Partial</option>
                  </select>
                </div>
              )}
              {formData.isBuybackAvailable === "YES" &&
                (formData.buybackCollected === "YES" ||
                  formData.buybackCollected === "PARTIALLY COLLECTED") && (
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Buyback Collected Date</label>
                    <input
                      type="date"
                      name="buybackCollectedDate"
                      value={formData.buybackCollectedDate}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                )}
              {formData.isBuybackAvailable === "YES" &&
                (formData.buybackCollected === "YES" ||
                  formData.buybackCollected === "PARTIALLY COLLECTED") && (
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Received Buyback Details with Qty</label>
                    <input
                      type="text"
                      name="buybackDetailsWithQty"
                      value={formData.buybackDetailsWithQty}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                )}
              {formData.isBuybackAvailable === "YES" &&
                (formData.buybackCollected === "YES" ||
                  formData.buybackCollected === "PARTIALLY COLLECTED") && (
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Buyback Send To HO/Disposed Locally</label>
                    <select
                      name="buybackSendToHoOrDisposedLocally"
                      value={formData.buybackSendToHoOrDisposedLocally}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      <option value="">Select</option>
                      <option value="SENT_TO_HO">Sent to HO</option>
                      <option value="DISPOSED_LOCALLY">Disposed Locally</option>
                    </select>
                  </div>
                )}
              {formData.isBuybackAvailable === "YES" &&
                (formData.buybackCollected === "YES" ||
                  formData.buybackCollected === "PARTIALLY COLLECTED") && (
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Local Disposal Details</label>
                    <input
                      type="text"
                      name="localDisposalDetails"
                      value={formData.localDisposalDetails}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                )}
            </>
          )}

          {/* Payment Information Section */}
          {canViewSection("paymentInfo") && (
            <>
              <h3 className={styles.sectionHeader}>Payment Information</h3>
              <PaymentDetails formData={formData} setFormData={setFormData} />
            </>
          )}

          <div className={styles.buttonContainer}>
            <button type="button" className={(styles.button, styles.closeButton)} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DashForm;
