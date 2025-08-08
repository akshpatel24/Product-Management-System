import React from "react";

interface DeleteModalProps {
  productId: number;
  productName: string;
  onClose: () => void;
  refreshList: () => void;
  token:any;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  productId,
  productName,
  onClose,
  refreshList,
  token
}) => {
  const handleDelete = async () => {
    const response = await fetch(`http://182.237.13.165/AkshReactAPI/api/Product/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // <-- Use the token here
      },
    });
    if (response.ok) {
      alert("Product deleted successfully!");
      refreshList();
      onClose();
    } else {
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="modal show fade d-block" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Delete</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete <strong>{productName}</strong>?</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
