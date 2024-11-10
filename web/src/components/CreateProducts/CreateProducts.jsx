import React, { useState, useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../reducers/Product/productSlice";
import { getCategories } from "../../reducers/Category/categorySlice";

const CreateProducts = ({ setOpenAddProduct }) => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    name: "",
    sku: "",
    price: "",
    description: "",
    category: "",
    subcategory: "",
    image: null,
  });

  const { categories, loading: categoryLoading } = useSelector(
    (state) => state.category
  );
  const { loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductData({ ...productData, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("sku", productData.sku);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("category", productData.category);
    formData.append("subcategory", productData.subcategory);
    formData.append("image", productData.image);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    dispatch(createProduct(formData))
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

  const selectedCategory = categories.find(
    (cat) => cat._id === productData.category
  );
  const subcategories = selectedCategory ? selectedCategory.subcategories : [];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center pb-4 mb-6 border-b">
          <h2 className="text-2xl font-semibold">Add New Product</h2>
          <RxCrossCircled
            onClick={() => setOpenAddProduct(false)}
            className="cursor-pointer text-red-600 text-3xl"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              required
            />
          </div>

          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleInputChange}
            placeholder="SKU"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            placeholder="Price"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <select
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          {subcategories.length > 0 && (
            <select
              name="subcategory"
              value={productData.subcategory}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          )}

          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            placeholder="Product Description"
            className="w-full px-4 py-2 border rounded-lg"
            rows="4"
          ></textarea>

          <div className="flex justify-end">
             {" "}
            <button
              type="submit"
              disabled={loading || categoryLoading}
              className={`px-6 py-2 rounded-lg font-semibold text-white ${
                loading || categoryLoading ? "bg-gray-400" : "bg-blue-600"
              }`}
            >
                  {loading ? "Adding..." : "Add Product"} {" "}
            </button>
          </div>

          {error && <p className="text-red-600 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateProducts;
