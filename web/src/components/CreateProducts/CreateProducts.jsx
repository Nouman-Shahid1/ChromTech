import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../reducers/Product/productSlice";

const CreateProducts = ({ setOpenAddProduct }) => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    name: "",
    sku: "",
    price: "",
    description: "",
    category: "HCPL COLUMNS",
    imageUrl: "",
    imageFile: null,
  });

  const { loading, error } = useSelector((state) => state.product);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductData({ ...productData, imageFile: file });
  };

  const onHandleCreate = () => {
    setOpenAddProduct(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData))
      .unwrap()
      .then(() => {
        alert("Product created successfully");
        setOpenAddProduct(false);
      })
      .catch((err) => {
        console.error("Error creating product:", err);
        alert(`Failed to create product: ${err}`);
      });
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-40 py-[200px] w-full z-50">
      <div className="w-[300px] sm:w-[500px] rounded-xl md:w-[700px] m-auto p-10 bg-white">
        <div className="flex justify-between pb-6 border-b">
          <p className="text-xl">
            <strong>Add Product</strong>
          </p>
          <RxCrossCircled
            onClick={onHandleCreate}
            className="cursor-pointer text-red-600 text-2xl"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input type="file" onChange={handleFileChange} />
          </div>

          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            required
          />
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleInputChange}
            placeholder="SKU"
            required
          />
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            placeholder="Price"
            required
          />
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            placeholder="Category"
          />
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            placeholder="Description"
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </button>
          {error && <p className="text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateProducts;
