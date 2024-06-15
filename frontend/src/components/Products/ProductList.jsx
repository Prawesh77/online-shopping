//Component to list product
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import Filter from "./Filter";

const ProductList = () => {
  const { products, status, error } = useSelector((state) => state.product);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdmin = useSelector((state) => state.user.isAdmin);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterCriteria, setFilterCriteria] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 10000,
  });


  useEffect(() => {
    let filtered = products;

    if (filterCriteria.category) {
      filtered = filtered.filter(
        (product) => product.category === filterCriteria.category
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.details.price >= filterCriteria.minPrice &&
        product.details.price <= filterCriteria.maxPrice
    );

    setFilteredProducts(filtered);
  }, [filterCriteria, products]);

  const handleFilterChange = (category, minPrice, maxPrice) => {
    setFilterCriteria({
      category,
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
    });
  };

//to do later: product lai category anusar dekhauney, jastai name of category and tyo category ko products as below
// category name:
// product1, product2, ...... 


  return (
    <div>
      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>{error}</div>}
      {status === "succeeded" && (
        <div>
          <Filter onFilterChange={handleFilterChange} />
          {/* <div className="App">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div> */}


          {/* ahile chai filter matra xa, search functionality to be added */}
          <div className="App">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      )}
      {isLoggedIn && isAdmin && (
        <Link to="/products/addnewproduct">
          <box-icon type="solid" name="plus-circle" size="lg" color="green" />
        </Link>
      )}
    </div>
  );
};

export default ProductList;
