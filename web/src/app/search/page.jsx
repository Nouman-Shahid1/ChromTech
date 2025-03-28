"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  searchProducts,
  clearSearchResults,
} from "@/reducers/Product/productSlice";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Chatbot from "@/components/Chatbot/chatbot";

const ProductCard = dynamic(
  () => import("../../components/ProductCard/ProductCard"),
  {
    loading: () => <p>Loading product...</p>,
  }
);
const Pagination = dynamic(
  () => import("../../components/Pagination/Pagination"),
  {
    loading: () => <p>Loading pagination...</p>,
  }
);

const SearchResults = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { searchResults, loading, error } = useSelector(
    (state) => state.product
  );
  const searchQuery = new URLSearchParams(window.location.search).get("query");


  const [filters, setFilters] = useState({
    category: [],
    priceRange: [0, 1000],
    inStockOnly: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Fetch search results with debounce
  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      if (searchQuery) {
        dispatch(searchProducts(searchQuery));
      }
    }, 300);

    return () => {
      clearTimeout(debounceFetch);
      dispatch(clearSearchResults());
    };
  }, [dispatch, searchQuery]);

  // Memoize filtered and sorted results
  const filteredResults = useMemo(() => {
    let results = [...searchResults];

    // Filter by category
    if (filters.category.length > 0) {
      results = results.filter((product) =>
        filters.category.includes(product.category)
      );
    }

    // Filter by price range
    results = results.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Filter by stock availability
    if (filters.inStockOnly) {
      results = results.filter((product) => product.inStock);
    }

    return results;
  }, [searchResults, filters]);

  // Memoize pagination and current items
  const totalPages = useMemo(
    () => Math.ceil(filteredResults.length / itemsPerPage),
    [filteredResults]
  );
  const currentItems = useMemo(
    () =>
      filteredResults.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [filteredResults, currentPage, itemsPerPage]
  );

  // Handlers using useCallback
  const handleProductClick = useCallback(
    (productId) => {
      router.push(`/product/${productId}`);
    },
    [router]
  );

  const handleSortChange = useCallback((e) => {
    console.log("Sort by:", e.target.value);
  }, []);

  const toggleCategory = useCallback((category) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...prev.category, category],
    }));
  }, []);

  const handlePriceRangeChange = useCallback((e) => {
    const [min, max] = e.target.value.split("-");
    setFilters((prev) => ({
      ...prev,
      priceRange: [Number(min), Number(max)],
    }));
  }, []);

  const toggleInStock = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      inStockOnly: !prev.inStockOnly,
    }));
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-6 py-56 mt-8 sm:mt-6">
        <div className="text-sm text-gray-600 mb-4">
          <p>
            Home / <span className="text-black font-semibold">Search</span>
          </p>
        </div>

        <h1 className="text-3xl font-bold mb-6">
          {filteredResults.length} results for '{searchQuery}'
        </h1>

        <div className="flex flex-col md:flex-row">
          <div className="min-w-[250px] bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            <h3 className="text-md font-semibold mb-2">Category</h3>
            <ul className="space-y-2 mb-4">
              {[
                "GC",
                "Instrumentation",
                "LC",
                "Sample Preparation",
                "Vials & Plates",
              ].map((category) => (
                <li key={category}>
                  <input
                    type="checkbox"
                    id={category}
                    checked={filters.category.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="mr-2"
                  />
                  <label htmlFor={category}>{category}</label>
                </li>
              ))}
            </ul>

            <h3 className="text-md font-semibold mb-2">Price Range</h3>
            <select
              className="p-2 rounded-md border border-gray-300 w-full mb-4"
              onChange={handlePriceRangeChange}
            >
              <option value="0-1000">All Prices</option>
              <option value="0-50">Under $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-500">$100 - $500</option>
              <option value="500-1000">Over $500</option>
            </select>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="inStock"
                checked={filters.inStockOnly}
                onChange={toggleInStock}
                className="mr-2"
              />
              <label htmlFor="inStock">In Stock Only</label>
            </div>
          </div>

          <div className="flex-1 ml-6">
            <div className="flex flex-col md:flex-row justify-between my-4">
              <h2 className="text-lg font-semibold">Products</h2>
              <select
                className="p-2 rounded-md border border-gray-300"
                onChange={handleSortChange}
              >
                <option>Sort By: Relevance</option>
                <option>Sort By: Newest Items</option>
                <option>Sort By: A To Z</option>
                <option>Sort By: Z To A</option>
                <option>Sort By: Pricing: Ascending</option>
                <option>Sort By: Pricing: Descending</option>
              </select>
            </div>
            <div className="flex flex-wrap  gap-6">
              <div className="flex flex-wrap gap-6 mx-auto">
                {" "}
                {currentItems.length > 0 ? (
                  currentItems.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => handleProductClick(product._id)}
                      className="cursor-pointer"
                    >
                      <ProductCard product={product} />     {" "}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-600">
                    No products found for '{searchQuery}'    {" "}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap justify-end mt-6">
              {" "}
              <Pagination

                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Chatbot/>
    </>
  );
};

export default SearchResults;
