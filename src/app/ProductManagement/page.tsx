"use client";
import { AuthContext } from "../layout";
import React, { useEffect, useState, useContext } from "react";
import AddEditProductModal from './ProductFormeditaddModal';
import ProductTable from "./ProductTable";
import DeleteModal from './ProductDeleteModal';
import ViewModal from './ProductViewModal';
import Pagination from "./Pagination";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ProductManagement: React.FC = () => {
  interface Product {
    pId?: number;
    pName: string;
    rate: number;
    department: string;
    mfgDate: string;
    notes: string;
    isDeleted?: boolean;
  }

  const [formProduct, setFormProduct] = useState<Product>({
    pName: '',
    rate: 0,
    department: '',
    mfgDate: '',
    notes: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  // const [selectedDepartment, setSelectedDepartment] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [departments] = useState<string[]>(["Grocery", "Sports", "Cosmetic"]);
  const [productlist, setProductlist] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewProductId, setViewProductId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Use useContext to access the AuthContext
  const authContext = useContext(AuthContext);
  const token = authContext?.authToken;

  const handleClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setFormProduct({
      pName: '',
      rate: 0,
      department: '',
      mfgDate: '',
      notes: '',
    });
  };
  
  const fetchProduct = async () => {
    // ✅ Check if token is available before fetching
    if (!token) {
        console.warn("No authentication token found. Aborting fetch.");
        return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://182.237.13.165/AkshReactAPI/api/Product/List', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setProductlist(data || []);
      } else {
        alert("Error fetching product list.");
      }
    } catch (error) {
      alert("An error occurred while fetching data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    // ✅ Call fetchProduct only when the token is available
    if (token) {
      fetchProduct();
    }
  }, [token]); // ✅ Add token as a dependency

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormProduct({ ...formProduct, [e.target.name]: e.target.value });
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormProduct((prev) => ({ ...prev, department: e.target.value }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const validateProduct = (product: Product): string[] => {
    const errors: string[] = [];
    if (!product.pName.trim()) errors.push("Product Name is required.");
    if (isNaN(product.rate) || product.rate <= 0) errors.push("Rate must be a positive number.");
    if (!product.department.trim()) errors.push("Department is required.");
    if (!product.mfgDate || isNaN(Date.parse(product.mfgDate))) errors.push("Manufacture Date must be valid.");
    if (typeof product.notes !== "string") errors.push("Notes must be text.");
    return errors;
  };
  const filteredProducts = productlist.filter((product) =>
    Object.values(product).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  








  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  console.log(totalPages)
  const indexOfLastItem = (currentPage * itemsPerPage);

  console.log("Index of Last Item:",indexOfLastItem)
  //keep track of last item
  const indexOfFirstItem = indexOfLastItem - itemsPerPage ;

  console.log("Index of First Item: ",indexOfFirstItem)
  //keeps index of first item.

  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  console.log("Current Product: ",currentProducts);
  return (
    <div className="container mt-4">
      <h1 className="h3 text-center mb-4">Product Management System</h1>

      <div className="text-end mb-3">
        <button
          className="btn btn-primary"
          onClick={() => {
            setIsEditing(false);
            setShowModal(true);
          }}
        >
          Add Product
        </button>
      </div>

      <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);

          }}
        />
      </div>
      {/* <select
    className="form-select w-auto"
    value={selectedDepartment}
    onChange={(e) => setSelectedDepartment(e.target.value)}
  >
    <option value="">All Departments</option>
    {departments.map((dept) => (
      <option key={dept} value={dept}>
        {dept}
      </option>
    ))}
  </select> */}



      {loading ? (
        <div className="text-center my-5">
          <i className="bi bi-arrow-repeat spinner-border" style={{ fontSize: "2rem" }}></i>
        </div>
      ) : (
        <ProductTable
          productlist={currentProducts}
          isEditing={isEditing}
          formProduct={formProduct}
          onEdit={(product) => {
            setFormProduct(product);
            setIsEditing(true);
            setShowModal(true);
          }}
          onView={(pId) => {
            setViewProductId(pId);
            setShowViewModal(true);
          }}
          onDelete={(product) => {
            setProductToDelete(product);
            setShowDeleteModal(true);
          }}
        />
      )}

      {showModal && (
        <AddEditProductModal
          isEditing={isEditing}
          formProduct={formProduct}
          departments={departments}
          handleClose={handleClose}
          handleInputChange={handleInputChange}
          handleDepartmentChange={handleDepartmentChange}
          refreshList={() => fetchProduct()}
          validateProduct={validateProduct}
          token={token} //
          productList={productlist} // ✅ t

        />
      )}

      {showViewModal && viewProductId && (
        <div className="modal show fade d-block" tabIndex={-1}>
          <ViewModal
            pId={viewProductId}
            onClose={() => {
              setShowViewModal(false);
              setViewProductId(null);
            }}
            token={token} // ✅ Pass token to the modal
          />
        </div>
      )}

      {showDeleteModal && productToDelete && (
        <DeleteModal
          productId={productToDelete.pId!}
          productName={productToDelete.pName}
          onClose={() => {
            setShowDeleteModal(false);
            setProductToDelete(null);
          }}
          refreshList={() => fetchProduct()}
          token={token} // ✅ Pass token to the modal
        />
      )}

      {totalPages > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div>
            <label className="me-2">Items per page:</label>
            <select
              className="form-select d-inline-block w-auto"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProductManagement;