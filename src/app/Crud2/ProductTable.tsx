"use client"
import React from "react";

interface Product {
  pId?: number;
  pName: string;
  rate: number;
  department: string;
  mfgDate: string;
  notes: string;
  isDeleted?: boolean;
}
interface ProductTableProps {
  productlist: Product[];
  isEditing: boolean;
  formProduct: Product;
  onView: (pId: number) => void;
  onDelete: (product: Product) => void;
  onEdit: (product: Product) => void; // Added
}
const ProductTable: React.FC<ProductTableProps> = ({
  productlist,
  formProduct,
  onView,
  onDelete,
  onEdit
}) => {
  return (
    <table className="table table-striped-columns">
      <thead>
        <tr>
          <th className="bg-primary text-white">Id</th>
          <th className="bg-primary text-white">Product Name</th>
          <th className="bg-primary text-white text-end">Rate</th>
          <th className="bg-primary text-white">Department</th>
          <th className="bg-primary text-white">Mfg Date</th>
          <th className="bg-primary text-white">Notes</th>
          <th className="bg-primary text-white">Actions</th>
        </tr>
      </thead>
      <tbody>
  {productlist.length === 0 ? (
    <tr>
      <td colSpan={7} className="text-center text-muted py-3">
        <i className="bi bi-journal-bookmark-fill me-2"></i>
        No data found
      </td>
    </tr>
  ) : (
    productlist.map((product) => (
      <tr key={product.pId}>
        <td>{product.pId}</td>
        <td>{product.pName}</td>
        <td className="text-end">{product.rate}</td>
        <td>{product.department}</td>
        <td>{new Date(product.mfgDate).toDateString()}</td>
        <td>{product.notes}</td>
        <td>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => onEdit(product)}
            title="Edit"
          >
            <i className="bi bi-pencil-square"></i>
          </button>
          <button
            className="btn btn-success btn-sm me-2"
            onClick={() => onView(product.pId!)}
            title="View"
          >
            <i className="bi bi-eye-fill"></i>
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(product)}
            title="Delete"
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

    </table>
  );
};

export default ProductTable;

