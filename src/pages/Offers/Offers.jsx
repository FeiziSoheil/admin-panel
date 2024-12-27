import React, { useEffect, useState } from "react";
import { LuTicketPercent } from "react-icons/lu";
import { MdOutlineDiscount } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Input from "../../Components/Input/Input";
import CustomSelect from "../../Components/CustomSelect/CustomSelect ";
import AutoBreadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import Button from '../../Components/Button/Button '
import GenericList from "../../Components/GenericList/GenericList";

export default function Offers() {
  const [allProducts, setAllProducts] = useState({});
  const [allOffersInfo, setAllOffersInfo] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sortType, setSortType] = useState('-1');
  const [searchResult, setSearchResult] = useState([]);
    const [currentViewMode, setCurrentViewMode] = useState("table");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [offersFormData, setOffersFormData] = useState({
    offerPercent: "0",
    offerCount: "0",
    productID: "",
  });

  const resetForm = () => {
    setOffersFormData({
      offerPercent: "0",
      offerCount: "0",
      productID: "",
    });
    setSelectedProduct("");
    setIsEditing(false);
    setEditingId(null);
  };

  const offersColumns = [
    {
      header: "ID",
      field: "id",
    },
    {
      header: "Product Name",
      field: "productName",
    },
    {
      header: "Percent",
      field: "offerPercent",
    },
    {
      header: "Count",
      field: "offerCount",
    },
    {
      header: "Actions",
      render: (item) => (
        <div className="space-x-2">
          <button
            onClick={() => handleEdit(item)}
            className="py-2 px-4 rounded-3xl text-blue-600 bg-blue-100"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="py-2 px-4 rounded-3xl text-red-600 bg-red-100"
          >
            Remove
          </button>
        </div>
      ),
    },
  ];

  const offersSortOptions = [
    { value: '-1', label: 'sort by...' },
    { value: 'ascPercent', label: 'sort by percent (H to L)' },
    { value: 'descPercent', label: 'sort by percent (L to H)' },
    { value: 'count', label: 'sort by count' },
  ];

  const sortOffers = (offers, sortType) => {
    if (!offers.length) return offers;

    const sortedOffers = [...offers];

    switch (sortType) {
      case 'ascPercent':
        return sortedOffers.sort((a, b) => a.offerPercent - b.offerPercent);
      case 'descPercent':
        return sortedOffers.sort((a, b) => b.offerPercent - a.offerPercent);
      case 'count':
        return sortedOffers.sort((a, b) => a.offerCount - b.offerCount);
      default:
        return sortedOffers;
    }
  };

  const onSortHandler = (selectedValue) => {
    setSortType(selectedValue);
    if (selectedValue === '-1') {
      setSearchResult(allOffersInfo);
      return;
    }
    const sortedOffers = sortOffers(allOffersInfo, selectedValue);
    setSearchResult(sortedOffers);
  };

  const onSearchHandler = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === '') {
      setSearchResult(allOffersInfo);
      return;
    }
    const filtered = allOffersInfo.filter((offer) =>
      offer.productName.toLowerCase().includes(searchTerm)
    );
    setSearchResult(filtered);
  };

  const getAllProducts = async () => {
    try {
      const productsRes = await fetch(
        "https://admin-panel-b0e69-default-rtdb.firebaseio.com/products.json"
      );
      const allProductData = await productsRes.json();
      if (allProductData) {
        setAllProducts(allProductData);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error("Error loading products");
    }
  };

  const getDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0].replace(/-/g, '/');
  };

  const onChangeHandler = (field, value) => {
    setOffersFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEdit = (offer) => {
    setIsEditing(true);
    setEditingId(offer.id);
    setOffersFormData({
      offerPercent: offer.offerPercent,
      offerCount: offer.offerCount,
      productID: offer.productID,
    });
    setSelectedProduct(offer.productID);
  };

  const handleDelete = async (offerId) => {
    if (!window.confirm('Are you sure you want to delete this offer?')) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://admin-panel-b0e69-default-rtdb.firebaseio.com/offers/${offerId}.json`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete offer');
      }

      toast.success("Offer deleted successfully");
      await getAllOffers();
    } catch (error) {
      console.error('Error deleting offer:', error);
      toast.error("Error deleting offer");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!offersFormData.productID) {
      toast.error("Please select a product");
      return;
    }

    setIsLoading(true);
    const offersData = {
      ...offersFormData,
      createdDate: getDate(),
    };

    try {
      const url = isEditing
        ? `https://admin-panel-b0e69-default-rtdb.firebaseio.com/offers/${editingId}.json`
        : "https://admin-panel-b0e69-default-rtdb.firebaseio.com/offers.json";

      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(offersData),
      });

      if (!response.ok) {
        throw new Error('Failed to save offer');
      }

      toast.success(isEditing ? "Offer updated successfully" : "Offer added successfully");
      resetForm();
      await getAllOffers();
    } catch (error) {
      console.error('Error saving offer:', error);
      toast.error(isEditing ? "Error updating offer" : "Error adding offer");
    } finally {
      setIsLoading(false);
    }
  };

  const getAllOffers = async () => {
    try {
      setIsLoading(true);
      const [offersRes, productsRes] = await Promise.all([
        fetch("https://admin-panel-b0e69-default-rtdb.firebaseio.com/offers.json"),
        fetch("https://admin-panel-b0e69-default-rtdb.firebaseio.com/products.json")
      ]);

      const [offersData, productsData] = await Promise.all([
        offersRes.json(),
        productsRes.json()
      ]);

      if (offersData) {
        const offersArray = Object.entries(offersData).map(([id, offer]) => ({
          id,
          ...offer,
          productName: productsData[offer.productID]?.productName || 'Unknown Product'
        }));

        setAllOffersInfo(offersArray);
        setSearchResult(offersArray);
      } else {
        setAllOffersInfo([]);
        setSearchResult([]);
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
      toast.error("Error loading offers");
    } finally {
      setIsLoading(false);
    }
  };

  const productOptions = Object.entries(allProducts).map(([id, product]) => ({
    value: id,
    label: product.productName,
  }));

  useEffect(() => {
    getAllProducts();
    getAllOffers();
  }, []);

  return (
    <>
      <AutoBreadcrumbs />

      <div className="w-full rounded-xl border p-8 mb-12">
        <h2 className="font-bold text-3xl font-poppins">
          {isEditing ? 'Edit Offer' : 'Add New Offer'}
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-14">
          <Input
            type="number"
            label="Percent"
            name="offerPercent"
            onChange={(e) => onChangeHandler("offerPercent", e.target.value)}
            value={offersFormData.offerPercent}
            className="col-span-1"
            icon={<LuTicketPercent className="w-6 h-6 text-gray-400" />}
          />
          <Input
            type="number"
            label="Count"
            name="offerCount"
            onChange={(e) => onChangeHandler("offerCount", e.target.value)}
            value={offersFormData.offerCount}
            className="col-span-1"
            maxLen={25}
            icon={<MdOutlineDiscount className="w-6 h-6 text-gray-400" />}
          />
          <CustomSelect
            value={selectedProduct}
            label="Product"
            onChange={(value) => {
              setSelectedProduct(value);
              onChangeHandler("productID", value);
            }}
            options={productOptions}
            placeholder="Select Product"
            className="col-span-1"
          />
          <div className="flex col-span-2 gap-4">
            <Button
              onClick={handleSubmit}
              className="w-full sm:w-auto"
              disabled={isLoading}
              icon={<FaCheck />}
            >
              {isEditing ? 'Update' : 'Submit'}
            </Button>
            {isEditing && (
              <Button
                onClick={resetForm}
                className="w-full sm:w-auto bg-gray-500"
                disabled={isLoading}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>

      <GenericList
        data={searchResult}
        columns={offersColumns}
        isLoading={isLoading}
        sortOptions={offersSortOptions}
        onSort={onSortHandler}
        onSearch={onSearchHandler}
        onViewModeChange={setCurrentViewMode}
        viewMode={currentViewMode}
      />
    </>
  );
}