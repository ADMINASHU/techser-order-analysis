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
        { label: "Is Buyback Available", key: "isBuybackAvailable" },
        { label: "Buyback Value", key: "buybackValue", type: "currency" },
        { label: "Warranty Period", key: "warrantyPeriod" },
      ],
    },
    {
      title: "Customer Information",
      fields: [
        { label: "Organization", key: "organization" },
        { label: "Customer Name", key: "customerName" },
        { label: "Branch ID", key: "branchId" },
        { label: "Branch Name", key: "branchName" },
        { label: "SAP Code", key: "sapCode" },
        { label: "ATM ID", key: "atmId" },
        { label: "State", key: "state" },
        { label: "Delivery Address", key: "deliveryAddress" },
        { label: "Pin Code", key: "pinCode" },
        { label: "Site Contact Name", key: "siteContactName" },
        { label: "Site Contact Number", key: "siteContactNumber" },
      ],
    },
    {
      title: "Product Details",
      isProductSection: true, // Add this flag for special handling
      fields: [], // We'll handle products separately
    },
    {
      title: "Indent and Invoice Information",
      fields: [
        { label: "Indent No", key: "indentNo" },
        { label: "Indent Date", key: "indentDate", type: "date" },
        { label: "Invoice No", key: "invoiceNo" },
        { label: "Invoice Date", key: "invoiceDate", type: "date" },
        { label: "Invoice Value", key: "invoiceValue", type: "currency" },
        { label: "Delivery Challan No", key: "deliveryChallanNo" },
        { label: "Delivery Challan Date", key: "deliveryChallanDate", type: "date" },
      ],
    },
    {
      title: "Delivery Information",
      fields: [
        { label: "Scheduled Dispatch Date", key: "scheduledDispatchDate", type: "date" },
        { label: "Actual Dispatch Date", key: "actualDispatchDate", type: "date" },
        { label: "Transporter Details", key: "transporterDetails" },
        { label: "Docket No", key: "docketNo" },
        { label: "Transporter Contact Details", key: "transporterContactDetails" },
        { label: "Planned Delivery Date", key: "plannedDeliveryDate", type: "date" },
        { label: "Actual Delivery Date", key: "actualDeliveryDate", type: "date" },
        { label: "Delivery Acknowledgement", key: "deliveryAcknowledgement" },
      ],
    },
    {
      title: "Installation and Buyback Information",
      fields: [
        { label: "Installation Planned Date", key: "installationPlannedDate", type: "date" },
        { label: "Actual Installation Date", key: "actualInstallationDate", type: "date" },
        { label: "Installation Done By", key: "installationDoneBy" },
        { label: "Installation Report No", key: "installationReportNo" },
        { label: "Buyback Collected", key: "buybackCollected" },
        { label: "Buyback Collected Date", key: "buybackCollectedDate", type: "date" },
        { label: "Buyback Details with Qty", key: "buybackDetailsWithQty" },
        { label: "Buyback Send To HO/Disposed Locally", key: "buybackSendToHoOrDisposedLocally" },
        { label: "Local Disposal Details", key: "localDisposalDetails" },
      ],
    },
    {
      title: "Payment Information",
      fields: [
        { label: "Payment Status", key: "paymentStatus" },
        { label: "Last Payment Received Date", key: "lastPaymentReceivedDate", type: "date" },
        { label: "Payment Amount", key: "paymentAmount", type: "currency" },
        { label: "Payment Details", key: "paymentDetails" },
        { label: "Remarks", key: "remarks" },
      ],
    },
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

  // Add new function to render products with conditional logic
  const renderProducts = () => (
    <div className={styles.productsGrid}>
      {initialData.products?.map((product, index) => (
        <div key={index} className={styles.productCard}>
          <h4>Product {index + 1}</h4>
          <p>
            <strong>Type:</strong> {product.productType}
          </p>
          <p>
            <strong>Category:</strong> {product.productCategory}
          </p>

          {/* Only show Rating/AH if not RACK or OTHERS */}
          {!(product.productCategory === "RACK" || product.productCategory === "OTHERS") && (
            <>
              <p>
                <strong>Serial No:</strong> {product.serialNo}
              </p>

              <p>
                <strong>
                  {product.productCategory === "BATTERY" ? "Capacity (AH)" : "Rating (KVA)"}:
                </strong>{" "}
                {product.rating}
              </p>
            </>
          )}

          <p>
            <strong>Quantity:</strong> {product.quantity}
          </p>

          {/* Show warranty only for ORDERED products and not for RACK or OTHERS */}
          {product.productType === "ORDERED" &&
            !(product.productCategory === "RACK" || product.productCategory === "OTHERS") && (
              <p>
                <strong>Warranty Period:</strong>{" "}
                {new Date(product.warrantyStartDate).toLocaleDateString()} to{" "}
                {new Date(product.warrantyEndDate).toLocaleDateString()}
              </p>
            )}
        </div>
      ))}
    </div>
  );

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
              {section.isProductSection ? (
                renderProducts()
              ) : (
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
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashView;
