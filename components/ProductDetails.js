"use client";

import { useState } from "react";
import styles from "./DashForm.module.css";

const ProductDetails = ({ formData, setFormData }) => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [productForm, setProductForm] = useState({
    productType: "",
    productCategory: "",
    serialNo: "",
    rating: "",
    quantity: "",
    warrantyStartDate: "",
    warrantyEndDate: "",
  });

  const handleAddProduct = () => {
    setFormData((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        {
          ...productForm,
          // Add any additional product metadata
          addedAt: new Date(),
        },
      ],
    }));

    // Reset product form
    setProductForm({
      productType: "",
      productCategory: "",
      serialNo: "",
      rating: "",
      quantity: "",
      warrantyStartDate: "",
      warrantyEndDate: "",
    });
    setShowProductForm(false);
  };

  const handleRemoveProduct = (index) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className={styles.productSection}>
      <div className={styles.productHeader}>
        <div className={styles.sectionTitle}>Product Details</div>
        <button
          type="button"
          onClick={() => setShowProductForm(true)}
          className={styles.addProductBtn}
        >
          <span>+</span> Add Product
        </button>
      </div>

      {formData.products.length === 0 ? (
        <div className={styles.emptyState}>No products added yet</div>
      ) : (
        <div className={styles.productsList}>
          {formData.products.map((product, index) => (
            <div key={index} className={styles.productCard}>
              <div className={styles.productInfo}>
                <p>
                  <strong>Type:</strong> {product.productType}
                </p>
                <p>
                  <strong>Category:</strong> {product.productCategory}
                </p>

                {!(product.productCategory === "RACK" || product.productCategory === "OTHERS") && (
                  <>
                    <p>
                      <strong>Serial No:</strong> {product.serialNo}
                    </p>

                    <p>
                      <strong>
                        {product.productCategory === "BATTERY" ? "Capacity (AH)" : "Rating (KVA)"}:{" "}
                      </strong>
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
                      <strong>Warranty:</strong>{" "}
                      {new Date(product.warrantyStartDate).toLocaleDateString()} to{" "}
                      {new Date(product.warrantyEndDate).toLocaleDateString()}
                    </p>
                  )}
              </div>
              <button
                type="button"
                onClick={() => handleRemoveProduct(index)}
                className={styles.removeProductBtn}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Product Form Modal */}
      {showProductForm && (
        <div className={styles.productFormOverlay}>
          <div className={styles.productForm}>
            <h4>Add Product Details</h4>
            <div className={styles.formGroup}>
              <label>Product Type</label>
              <select
                value={productForm.productType}
                onChange={(e) =>
                  setProductForm((prev) => ({
                    ...prev,
                    productType: e.target.value,
                  }))
                }
              >
                <option value="">Select Type</option>
                <option value="ORDERED">Ordered</option>
                <option value="BUYBACK">Buyback</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Product Category</label>
              <select
                value={productForm.productCategory}
                onChange={(e) =>
                  setProductForm((prev) => ({
                    ...prev,
                    productCategory: e.target.value,
                  }))
                }
              >
                <option value="">Select Category</option>
                <option value="UPS">UPS</option>
                <option value="BATTERY">Battery</option>
                <option value="RACK">Rack</option>
                <option value="INVERTER">Inverter</option>
                <option value="SERVO">Servo</option>
                <option value="OTHERS">Others</option>
              </select>
            </div>

            {!(productForm.productCategory === "RACK" || productForm.productCategory === "OTHERS") && (
              <>
                <div className={styles.formGroup}>
                  <label>Serial No</label>
                  <input
                    type="text"
                    value={productForm.serialNo}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        serialNo: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>
                    {productForm.productCategory === "BATTERY" ? "Capacity (AH)" : "Rating (KVA)"}
                  </label>
                  <input
                    type="text"
                    value={productForm.rating}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        rating: e.target.value,
                      }))
                    }
                  />
                </div>
              </>
            )}

            <div className={styles.formGroup}>
              <label>Quantity</label>
              <input
                type="number"
                value={productForm.quantity}
                onChange={(e) =>
                  setProductForm((prev) => ({
                    ...prev,
                    quantity: e.target.value,
                  }))
                }
              />
            </div>

            {/* Add conditional rendering for warranty fields */}
            {productForm.productType === "ORDERED" &&
              !(productForm.productCategory === "RACK" || productForm.productCategory === "OTHERS") && (
                <>
                  <div className={styles.formGroup}>
                    <label>Warranty Start Date</label>
                    <input
                      type="date"
                      value={productForm.warrantyStartDate}
                      onChange={(e) =>
                        setProductForm((prev) => ({
                          ...prev,
                          warrantyStartDate: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Warranty End Date</label>
                    <input
                      type="date"
                      value={productForm.warrantyEndDate}
                      onChange={(e) =>
                        setProductForm((prev) => ({
                          ...prev,
                          warrantyEndDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                </>
              )}

            <div className={styles.productFormButtons}>
              <button
                type="button"
                onClick={() => setShowProductForm(false)}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
              <button type="button" onClick={handleAddProduct} className={styles.saveBtn}>
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
