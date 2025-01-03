"use client";

import { useState } from "react";
import styles from "./PaymentDetails.module.css";

const PaymentDetails = ({ formData, setFormData }) => {
  const [payment, setPayment] = useState({
    paymentDate: "",
    paymentAmount: "",
    paymentDetails: "",
    paymentStatus: "",
    remarks: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  };

  const addPayment = () => {
    setFormData((prev) => ({
      ...prev,
      payments: [...prev.payments, payment],
    }));
    setPayment({
      paymentDate: "",
      paymentAmount: "",
      paymentDetails: "",
      paymentStatus: "",
      remarks: "",
    });
    setShowForm(false);
  };

  const removePayment = (index) => {
    setFormData((prev) => ({
      ...prev,
      payments: prev.payments.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className={styles.paymentDetails}>
      <button
        type="button"
        onClick={() => setShowForm(!showForm)}
        className={styles.addButton}
      >
        <span>+</span> Add Payment
      </button>

      {showForm && (
        <div className={styles.paymentFormOverlay}>
          <div className={styles.paymentForm}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Payment Date</label>
              <input
                type="date"
                name="paymentDate"
                value={payment.paymentDate}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Payment Amount</label>
              <input
                type="number"
                name="paymentAmount"
                value={payment.paymentAmount}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Payment Details</label>
              <input
                type="text"
                name="paymentDetails"
                value={payment.paymentDetails}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Payment Status</label>
              <select
                name="paymentStatus"
                value={payment.paymentStatus}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="">Select</option>
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
                <option value="FAILED">Failed</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Remarks</label>
              <input
                type="text"
                name="remarks"
                value={payment.remarks}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.paymentFormButtons}>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button type="button" onClick={addPayment} className={styles.saveButton}>
                Save Payment
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.paymentsList}>
        {formData.payments.map((pay, index) => (
          <div key={index} className={styles.paymentItem}>
            <div className={styles.paymentInfo}>
              <p>
                <strong>Date:</strong> {pay.paymentDate}
              </p>
              <p>
                <strong>Amount:</strong> {pay.paymentAmount}
              </p>
              <p>
                <strong>Details:</strong> {pay.paymentDetails}
              </p>
              <p>
                <strong>Status:</strong> {pay.paymentStatus}
              </p>
              <p>
                <strong>Remarks:</strong> {pay.remarks}
              </p>
            </div>
            <button
              type="button"
              onClick={() => removePayment(index)}
              className={styles.removeButton}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentDetails;
