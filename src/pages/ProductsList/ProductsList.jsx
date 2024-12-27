import React, { useState, useEffect } from "react";
import GenericList from "../../Components/GenericList/GenericList";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

export default function ProductsList() {
  const [currentViewMode, setCurrentViewMode] = useState("table");
  const [allProducts, setAllProducts] = useState([]);
  const [searchResultProduct, setsearchResultProduct] = useState([]);
  const [isLoading, setIsisLoading] = useState(true);
  const [sortType, setSortType] = useState("-1");

  const getAllProducts = async () => {
    try {
      const response = await fetch(
        "https://admin-panel-b0e69-default-rtdb.firebaseio.com/products.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();

      const productsArray = data
        ? Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          })).reverse()
        : [];

      setAllProducts(productsArray);
      setsearchResultProduct(productsArray);
      setIsisLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
      setIsisLoading(false);
    }
  };

  useEffect(() => {
    setIsisLoading(true);
    getAllProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `https://admin-panel-b0e69-default-rtdb.firebaseio.com/products/${productId}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      const updatePdouct = allProducts.filter(
        (product) => product.id !== productId
      );
      setsearchResultProduct(updatePdouct);
      setAllProducts(updatePdouct);

      if (updatePdouct.length === 0) {
        setAllProducts([]);
        setsearchResultProduct([]);
      }

      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const productColumns = [
    {
      header: "ID",
      field: "id",
    },

    {
      header: "Name",
      field: "productName",
    },
    {
      header: "Price",
      render: (item) => <span>${Number(item.price).toLocaleString()}</span>,
    },
    {
      header: "Category",
      field: "category",
    },
    {
      header: "Brand",
      field: "brand",
    },
    {
      header: "Quantity",
      render: (item) => (
        <span className={`${Number(item.quantity) <= 5 ? "text-red-500" : ""}`}>
          {Number(item.quantity) <= 5
            ? `Only ${item.quantity} left!`
            : item.quantity}
        </span>
      ),
    },
    {
      header: "Actions",
      render: (item) => (
        <div className="space-x-2">
          <Link
            to={`/products/edit-product/${item.id}`}
            className="py-2 px-4 rounded-3xl text-blue-600 bg-blue-100 hover:bg-blue-200"
          >
            Edit
          </Link>
          <button
            className="py-2 px-4 rounded-3xl text-red-600 bg-red-100 hover:bg-red-200"
            onClick={() => handleDelete(item.id)}
          >
            Remove
          </button>
        </div>
      ),
    },
  ];

 
  const sortOptionsForElectronics = [
    { value: "-1", label: "Select Sort" },
    { value: "priceAsc", label: "Sort by Price (Low to High)" },
    { value: "priceDesc", label: "Sort by Price (High to Low)" },
    { value: "dateDesc", label: "Sort by Oldest" },
    { value: "laptop", label: "Sort by Laptop" }, 
    { value: "smartphone", label: "Sort by Smartphone" },
    { value: "monitor", label: "Sort by Monitor" }, 
    { value: "tablet", label: "Sort by Tablet" },
    { value: "headphone", label: "Sort by Headphone" },
    { value: "dateDesc", label: "Sort by Newest First" },
  ];

  const sortProducts = (products, sortType) => {
    if (!products.length) return products;
    const sortedProducts = [...products];

    switch (sortType) {

      case "priceAsc":
        return sortedProducts.sort((a, b) => a.price - b.price);

      case "priceDesc":
        return sortedProducts.sort((a, b) => b.price - a.price);

      case "laptop":
        return sortedProducts.filter(
          (product) => product.category === sortType
        );

      case "smartphone":
        return sortedProducts.filter(
          (product) => product.category === sortType
        );

      case "monitor":
        return sortedProducts.filter(
          (product) => product.category === sortType
        );

      case "tablet":
        return sortedProducts.filter(
          (product) => product.category === sortType
        );

      case "headphone":
        return sortedProducts.filter(
          (product) => product.category === sortType
        );

        case "dateDesc":
          return sortedProducts.sort((a, b) => {
            const parseDate = (dateString) => {
              const [year, month, day] = dateString.split('/').map(Number);
              return new Date(year, month - 1, day);
            };
        
            const dateA = parseDate(a.createdDate || "1970/01/01");
            const dateB = parseDate(b.createdDate || "1970/01/01");
        
            return dateA- dateB ; 
          })

      default:
        return sortedProducts;
    }
  };

  const handleSortChange = (selectedValue) => {
    setSortType(selectedValue);
    if (selectedValue === "-1") {
      setsearchResultProduct(allProducts);
      return;
    }
    const sortedProducts = sortProducts(allProducts, selectedValue);
    setsearchResultProduct(sortedProducts);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    let filteredProducts

    if (searchTerm == "") {
        if (sortType!=='-1'){
          filteredProducts = sortProducts(allProducts,sortType)
        }else{
          filteredProducts = [...allProducts]
        }
    }else{
      const searchResult = sortType !== '-1'?
      searchResultProduct :allProducts
      filteredProducts =searchResult.filter(
        (products) =>
          (products.productName &&
            products.productName.toLowerCase().includes(searchTerm)) ||
          (products.selectedCategory &&
            products.selectedCategory.toLowerCase().includes(searchTerm)) ||
          (products.availableBrands &&
            products.availableBrands.toLowerCase().includes(searchTerm))
      );
    }

    setsearchResultProduct(filteredProducts);
  };

  return (
    <GenericList
      data={searchResultProduct || []}
      columns={productColumns}
      styles={{ title: "Products List" }}
      viewMode={currentViewMode}
      onViewModeChange={setCurrentViewMode}
      onSearch={handleSearch}
      isLoading={isLoading}
      path="/products/add-new-product"
      onAddNew={() => navigate("/products/add-new-product")}
      sortOptions={sortOptionsForElectronics}
      onSort={handleSortChange}
    />
  );
}
