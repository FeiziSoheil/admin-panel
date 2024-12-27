import React, { useEffect, useState } from "react";
import Input from "../../Components/Input/Input";
import { FaCheck, FaTag, FaBoxOpen } from "react-icons/fa";
import {
  MdCategory,
  MdOutlineDescription,
  MdAttachMoney,
} from "react-icons/md";
import { LuUpload } from "react-icons/lu";
import { BiBarcode } from "react-icons/bi";
import { TbBrandAppgallery, TbNumbers } from "react-icons/tb";
import Button from "../../Components/Button/Button ";
import { ProductPreviewCard } from "../../Components/PreviewCard/PreviewCard";
import AutoBreadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrStatusInfo } from "react-icons/gr";
import CustomSelect from "../../Components/CustomSelect/CustomSelect ";

export default function AddNewProduct() {
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");
  const [isFullDescriptionVisible, setIsFullDescriptionVisible] =
    useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [availableBrands, setAvailableBrands] = useState([]);
    const [isLoading,setIsLoading] = useState(false)

  
  const [errors, setErrors] = useState({});

  const getDate = () => {
    const date = new Date();

    const year = date.getFullYear(); 
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const currentDate = `${year}/${month}/${day}`
    return currentDate
    
  };

  const validateForm = () => {
    const newErrors = {};

    if (!productName.trim()) {
      newErrors.productName = "Product name is required";
    } else if (productName.length > 50) {
      newErrors.productName = "Product name must be less than 50 characters";
    }

    if (!productCode.trim()) {
      newErrors.productCode = "Product code is required";
    } else if (productCode.length > 20) {
      newErrors.productCode = "Product code must be less than 20 characters";
    }

    if (!category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!status) {  
      newErrors.brand = "Brand is required";
    }

    if (!price) {
      newErrors.price = "Price is required";
    } else if (isNaN(price) || Number(price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    if (!quantity) {
      newErrors.quantity = "Quantity is required";
    } else if (isNaN(quantity) || Number(quantity) < 0) {
      newErrors.quantity = "Quantity must be a non-negative number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the form errors before submitting");
      return;
    }

    const productData = {
      productName,
      productCode,
      category: selectedCategory,
      brand: status, 
      price,
      quantity,
      description,
      createdDate : getDate()
    };

    try {
      setIsLoading(true)
      const response = await fetch(
        "https://admin-panel-b0e69-default-rtdb.firebaseio.com/products.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const result = await response.json();
      console.log("Product added:", result);
      toast.success("Product added successfully!");
      setIsLoading(false)
      // Clear form
      setProductName("");
      setProductCode("");
      setCategory("");
      setPrice("");
      setQuantity("");
      setDescription("");
      setBrand("");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add product. Please try again.");
      setIsLoading(false)

    }
  };

  const renderDescription = () => {
    if (description.length <= 30) {
      return <p className="font-inter break-words">{description}</p>;
    }

    if (!isFullDescriptionVisible) {
      return (
        <div className="flex flex-col">
          <p className="font-inter">{`${description.substring(0, 30)}...`}</p>
          <button
            className="text-blue-500 hover:text-blue-700 underline text-sm mt-1 self-start"
            onClick={() => setIsFullDescriptionVisible(true)}
          >
            See More
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col">
        <p className="font-inter whitespace-pre-line break-words max-w-60">
          {description}
        </p>
        <button
          className="text-blue-500 hover:text-blue-700 underline text-sm mt-1 self-start"
          onClick={() => setIsFullDescriptionVisible(false)}
        >
          See Less
        </button>
      </div>
    );
  };

  const productCategory = [
    {
      title: "laptop",
      brands: [
        { title: "Samsung" },
        { title: "Apple" },
        { title: "Dell" },
        { title: "HP" },
        { title: "Lenovo" },
        { title: "Acer" },
        { title: "Asus" },
        { title: "MSI" },
      ],
    },
    {
      title: "smartphone",
      brands: [
        { title: "Samsung" },
        { title: "Apple" },
        { title: "Xiaomi" },
        { title: "OnePlus" },
        { title: "Huawei" },
        { title: "Google" },
        { title: "Sony" },
        { title: "Oppo" },
      ],
    },
    {
      title: "tablet",
      brands: [
        { title: "Samsung" },
        { title: "Lenovo" },
        { title: "Microsoft" },
        { title: "Apple" },
        { title: "Huawei" },
        { title: "Amazon" },
      ],
    },
    {
      title: "monitor",
      brands: [
        { title: "LG" },
        { title: "Samsung" },
        { title: "Asus" },
        { title: "Acer" },
        { title: "BenQ" },
        { title: "Dell" },
        { title: "ViewSonic" },
      ],
    },
    {
      title: "headphones",
      brands: [
        { title: "Sony" },
        { title: "Bose" },
        { title: "JBL" },
        { title: "Beats" },
        { title: "Sennheiser" },
        { title: "Shure" },
        { title: "AKG" },
      ],
    },
    {
      title: "wearables",
      brands: [
        { title: "Samsung" },
        { title: "Apple" },
        { title: "Fitbit" },
        { title: "Garmin" },
        { title: "Xiaomi" },
        { title: "Amazfit" },
        { title: "Huawei" },
      ],
    },
  ];
  
  const handleCategoryChange = (e) => {
    const selectedCategoryTitle = e.target.value;
    setSelectedCategory(selectedCategoryTitle);
    setCategory(selectedCategoryTitle);

    // Find the selected category and update available brands
    const selectedCategoryData = productCategory.find(
      (cat) => cat.title === selectedCategoryTitle
    );
    
    if (selectedCategoryData) {
      setAvailableBrands(selectedCategoryData.brands);
      // Reset brand selection when category changes
      setStatus("");
    } else {
      setAvailableBrands([]);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <AutoBreadcrumbs />
      <h2 className="font-bold text-3xl font-poppins">Add New Product</h2>

      {/* Toast Container */}
      <ToastContainer position="top-right" />

      <div className="grid grid-cols-4 gap-5 mt-14">
        <div className="col-span-3 grid grid-cols-2 gap-x-3 gap-y-8 h-max">
          <Input
            type="text"
            label="Product Name"
            name="productName"
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
            className={"col-span-1"}
            maxLen={50}
            icon={<FaBoxOpen className="w-6 h-6 text-gray-400" />}
            error={errors.productName}
          />
          <Input
            type="text"
            label="Product Code"
            name="productCode"
            onChange={(e) => setProductCode(e.target.value)}
            value={productCode}
            maxLen={20}
            icon={<BiBarcode className="w-6 h-6 text-gray-400" />}
            error={errors.productCode}
          />
         <Input
            type="select"
            label="Category"
            name="category"
            onChange={handleCategoryChange}
            value={selectedCategory}
            icon={<MdCategory className="w-6 h-6 text-gray-400" />}
            error={errors.category}
            options={productCategory.map(cat => ({
              value: cat.title,
              label: cat.title.charAt(0).toUpperCase() + cat.title.slice(1)
            }))}
          />
            <Input
            type="select"
            label="Brand"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={!availableBrands? 'select':availableBrands.map(brand => ({
              value: brand.title,
              label: brand.title
            }))}
            icon={<TbBrandAppgallery className="w-6 h-6 text-gray-400" />}
            disabled={!selectedCategory}
            error={errors.brand}  
          />
          <Input
            type="number"
            label="Price"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            icon={<MdAttachMoney className="w-6 h-6 text-gray-400" />}
            error={errors.price}
          />
          <Input
            type="number"
            label="Quantity"
            name="quantity"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
            icon={<TbNumbers className="w-6 h-6 text-gray-400" />}
            error={errors.quantity}
          />
         
          <Input
            onChange={(e) => setDescription(e.target.value)}
            type={"textarea"}
            label={"Description"}
            value={description}
            className={"col-span-2"}
            icon={<MdOutlineDescription className="w-6 h-6 text-gray-400" />}
          />

          <div className="col-span-2">
            <h3 className="font-bold text-xl font-poppins">
              Product Guidelines
            </h3>
            <p className="font-inter mt-2">
              Please ensure all product details are accurate before submission.
              High-quality images and detailed descriptions help buyers make
              informed decisions.
            </p>
          </div>
          <div className="flex col-span-2 justify-start">
            <Button
              type="submit"
              disabled={isLoading?true:false}
              className="w-full sm:w-auto"
              icon={<FaCheck />}
              onClick={handleSubmit}
            >
              Add Product
            </Button>
          </div>
        </div>

        <ProductPreviewCard
          productImage={productImage}
          productName={productName}
          productCode={productCode}
          category={category}
          price={price}
          quantity={quantity}
          description={description}
          renderDescription={renderDescription}
        />
      </div>
    </div>
  );
}
