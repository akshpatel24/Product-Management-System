"use client"
import React, { useEffect, useState } from "react";

interface Product {
  pId?: number;
  pName: string;
  rate: number;
  department: string;
  mfgDate: string;
  notes: string;
  token:any;
}
interface ViewDeleteModalProps {
  pId: number;
  onClose: () => void;
  token: any;
}

const ViewModal: React.FC<ViewDeleteModalProps> = (props) => {
  const [product, setProduct] = useState<Product | null>(null);

  const handleView = async (pId: number) => {
    // Include the token in the headers for authentication
    const response = await fetch(`http://182.237.13.165/AkshReactAPI/api/Product/Get-by-code/${pId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`, // <-- Use the token here
      },
    });

    if (response.ok) {
      const data = await response.json();
      setProduct(data);
    } else {
      alert("Failed to fetch product.");
      props.onClose();
    }
  };

  useEffect(() => {
    handleView(props.pId);
  }, [props.pId]);

  if (!product) return null;

  return (
    <div className="modal show fade d-block" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Product Details</h5>
            <button className="btn-close" onClick={props.onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>ID:</strong> {product.pId}</p>
            <p><strong>Name:</strong> {product.pName}</p>
            <p><strong>Rate:</strong> {product.rate}</p>
            <p><strong>Department:</strong> {product.department}</p>
            <p><strong>MFG Date:</strong> {product.mfgDate.split("T")[0]}</p>
            <p><strong>Notes:</strong> {product.notes}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={props.onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
