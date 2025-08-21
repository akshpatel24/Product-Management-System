"use client";
import React, { useEffect, useState } from "react";
import AddEditProductModal from './ProductFormeditaddModal';
import ProductTable from "./ProductTable";
import DeleteModal from './ProductDeleteModal';
import ViewModal from './ProductViewModal';
import Pagination from "./Pagination";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// let token: string | null = null; // ✅ normal variable for token

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
  const [token, setToken] = useState<string | null>(null);
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
  
  //meant to be used for refresh
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageFromUrl = urlParams.get("page");
    const savedPage = localStorage.getItem("currentPage");
  
    // Validate URL parameter first (highest priority)
    if (pageFromUrl) {
      const pageNumFromUrl = Number(pageFromUrl);
      if (pageNumFromUrl > 0 && Number.isInteger(pageNumFromUrl)) {
        setCurrentPage(pageNumFromUrl);
        return; // Exit early - URL parameter is valid and applied
      }
    }
  
    // Validate localStorage value (second priority)
    if (savedPage) {
      const pageNumFromStorage = Number(savedPage);
      if (pageNumFromStorage > 0 && Number.isInteger(pageNumFromStorage)) {
        setCurrentPage(pageNumFromStorage);
        return; // Exit early - localStorage value is valid and applied
      }
    }
  
    // If both fail validation, currentPage remains at default value (1)
    // No need to explicitly set it since useState(1) already handles the default
  }, []);

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
    if (!token) return; // ✅ use normal variable
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
    const savedToken = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
      fetchProduct();
    }
  }, [token]);


  //fetchProduct runs on component mount and token state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormProduct({ ...formProduct, [e.target.name]: e.target.value });
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormProduct((prev) => ({ ...prev, department: e.target.value }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // ✅ Save to URL
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    window.history.pushState({}, "", url);

    // ✅ Save to localStorage
    localStorage.setItem("currentPage", page.toString());


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
      String(value ?? "").toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  //round's up
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

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
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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
          refreshList={fetchProduct}
          validateProduct={validateProduct}
          token={token} // ✅ normal variable
          productList={productlist}
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
            token={token}
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
          refreshList={fetchProduct}
          token={token}
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
