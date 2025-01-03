"use client";

import styles from "./DashView.module.css";

const DashView = ({ initialData, onClose }) => {
  const sections = [
    {
      title: "Order Details",
      fields: [
        { label: "Order For", key: "orderFor" },
        { label: "PO Date", key: "poDate", type: "date" },
        { label: "Customer PO No", key: "customerPoNo" },
        { label: "Order Value", key: "orderValue", type: "currency" },
        { label: "Buyback Available", key: "isBuybackAvailable" },
        { label: "Buyback Value", key: "buybackValue", type: "currency" },
      ],
    },
    {
      title: "Customer Information",
      fields: [
        { label: "Organization", key: "organization" },
        { label: "Customer Name", key: "customerName" },
        { label: "Branch ID", key: "branchId" },
        { label: "Branch Name", key: "branchName" },
        { label: "State", key: "state" },
        { label: "Delivery Address", key: "deliveryAddress" },
      ],
    },
    {
      title: "Product Details",
      fields: [
        { label: "System Description", key: "systemDescription" },
        { label: "System Quantity", key: "systemQuantity" },
        { label: "Battery Description", key: "batteryDescription" },
        { label: "Battery Quantity", key: "batteryQuantity" },
        { label: "Warranty Period", key: "warrantyPeriod" },
        { label: "Serial No", key: "serialNo" },
      ],
    },
    // Add more sections as needed
  ];

  const formatValue = (value, type) => {
    if (!value) return "-";
    switch (type) {
      case "date":
        return new Date(value).toLocaleDateString();
      case "currency":
        return `₹${Number(value).toLocaleString()}`;
      default:
        return value;
    }
  };

  return (
    <div className={styles.viewWrapper}>
      <div className={styles.viewContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.header}>
          <h2>Order Details</h2>
          <div className={styles.status}>
            <span className={`${styles.badge} ${styles[initialData.paymentStatus?.toLowerCase()]}`}>
              {initialData.paymentStatus || "N/A"}
            </span>
          </div>
        </div>

        <div className={styles.content}>
          {sections.map((section) => (
            <div key={section.title} className={styles.section}>
              <h3 className={styles.sectionTitle}>{section.title}</h3>
              <div className={styles.grid}>
                {section.fields.map((field) => (
                  <div key={field.key} className={styles.field}>
                    <label className={styles.label}>{field.label}</label>
                    <div className={styles.value}>
                      {formatValue(initialData[field.key], field.type)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashView;
