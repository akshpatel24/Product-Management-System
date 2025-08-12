import React from 'react';

interface Product {
  pId?: number;
  pName: string;
  rate: number;
  department: string;
  mfgDate: string;
  notes: string;
}

interface Props {
  isEditing: boolean;
  formProduct: Product;
  departments: string[];
  handleClose: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDepartmentChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  refreshList: () => void;
  validateProduct: (product: Product) => string[];
  token: any;
  productList: Product[]; // ✅ Added this line
}

const AddEditProductModal: React.FC<Props> = ({
  isEditing,
  formProduct,
  departments,
  handleClose,
  handleInputChange,
  handleDepartmentChange,
  refreshList,
  validateProduct,
  token,
  productList // ✅ Destructured it
}) => {

  const addProduct = async () => {
    const response = await fetch('http://182.237.13.165/AkshReactAPI/api/Product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formProduct),
    });
    if (response.ok) {
      alert("Product added successfully!");
      refreshList();
      handleClose();
    } else {
      alert("Error adding product.");
    }
  };

  const updateProduct = async () => {
    const response = await fetch(`http://182.237.13.165/AkshReactAPI/api/Product/${formProduct.pId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formProduct),
    });
    if (response.ok) {
      alert("Product updated successfully!");
      refreshList();
      handleClose();
    } else {
      alert("Failed to update product.");
    }
  };

  const handleSave = () => {
    const errors = validateProduct(formProduct);
    if (errors.length) {
      alert(errors.join('\n'));
      return;
    }

    // ✅ Prevent duplicates when adding
    if (!isEditing) {
      const isDuplicate = productList.some(
        (p) => p.pName.trim().toLowerCase() === formProduct.pName.trim().toLowerCase()
      );
      if (isDuplicate) {
        alert("Product with the same name already exists.");
        return;
      }
    }

    isEditing ? updateProduct() : addProduct();
  };

  return (
    <div className="modal show fade d-block" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEditing ? 'Edit Product' : 'Add Product'}</h5>
            <button className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              name="pName"
              className="form-control mb-2"
              placeholder="Product Name"
              value={formProduct.pName}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="rate"
              className="form-control mb-2"
              placeholder="Rate"
              value={formProduct.rate}
              onChange={handleInputChange}
            />
            <select
              name="department"
              className="form-control mb-2"
              value={formProduct.department}
              onChange={handleDepartmentChange}
            >
              <option value="" disabled>Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <input
              type="date"
              name="mfgDate"
              className="form-control mb-2"
              value={formProduct.mfgDate ? formProduct.mfgDate.split('T')[0] : ''}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}  // This sets minimum selectable date to today

            />
            <input
              type="text"
              name="notes"
              className="form-control mb-2"
              placeholder="Notes"
              value={formProduct.notes}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleClose}>Close</button>
            <button className="btn btn-primary" onClick={handleSave}>
              {isEditing ? 'Update Product' : 'Save Product'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditProductModal;

//sdfsdfs