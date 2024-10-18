import { useEffect, useState } from "react";
import { useFeatu } from "../context/feature/featureContext";
import useProduct from "../hooks/useProduct";
import Currency from "../utils/Corrency";
import { IoBagAddOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import LoadingAnimtion from "../components/loading/LoadingAnimtion";
import { useFilter } from "../context/filter/filterContext";
import { useCart } from "../context/cart/cartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFavorite } from "../context/favorite/favoriteContext";

function ViewAllProducts() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleProductsCount, setVisibleProductsCount] = useState(5);
  const [clickedProducts, setClickedProducts] = useState({});
  const [selectedData] = useFeatu();
  const { isLoading } = useProduct();
  const {sorting, sortFilterProducts} = useFilter();
  const {addToCart} = useCart();
  const { setSelectedFavoriteItems } = useFavorite();

  const navigate = useNavigate();

  // Scroll to the bottom when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter products based on selectedData
  useEffect(() => {
    const filterProductsBasedOnSelectedData = () => {
      const filtered = sortFilterProducts.filter((product) => {
        if (selectedData.bannerCate && selectedData.gender) {
          return (
            (product.featuredCategory?.name === selectedData?.bannerCate ||
              product.clothCategory?.categoryName === selectedData?.bannerCate) &&
            product?.gender === selectedData?.gender
          );
        } else if (selectedData.bannerCate) {
          return product.featuredCategory?.name === selectedData?.bannerCate || product.clothCategory?.categoryName === selectedData?.bannerCate;
        } else if (selectedData.gender) {
          return product?.gender === selectedData?.gender;
        }
  
        return false;
      });
      return filtered
    }

    const filterData = filterProductsBasedOnSelectedData();
    setFilteredProducts(filterData);
  }, [sortFilterProducts, selectedData.bannerCate, selectedData.gender]);

  // Another way
  // useEffect(() => {
  //   const filterProductsBasedOnSelectedData = () => {
  //     return sortFilterProducts.filter((product) => {
  //       const matchesBannerCate = selectedData.bannerCate
  //         ? product.featuredCategory?.name === selectedData.bannerCate ||
  //           product.clothCategory?.categoryName === selectedData.bannerCate
  //         : true;

  //       const matchesGender = selectedData.gender
  //         ? product.gender === selectedData.gender
  //         : true;

  //       return matchesBannerCate && matchesGender;
  //     });
  //   };

  //   const filteredData = filterProductsBasedOnSelectedData();
  //   setFilteredProducts(filteredData);
  // }, [sortFilterProducts, selectedData.bannerCate, selectedData.gender]);

  // Clear the context data when component unmounts
  // useEffect(() => {
  //   return () => {
  //     setSelectedData({
  //       bannerCate: "",
  //       gender: "",
  //     });
  //   };
  // }, [setSelectedData]);

  const handleAddtoCart = (e, product) => {
    e.stopPropagation(); // Stop event propagation

    if (clickedProducts[product._id]) return; // Prevent multiple clicks

    setClickedProducts(prevState => ({
      ...prevState,
      [product._id]: true,
    }));

    toast.success("Item added to cart");
    addToCart(product);

    setTimeout(() => {
      setClickedProducts(prevState => ({
        ...prevState,
        [product._id]: false,
      }));
    }, 2000); // Revert icon back after 2 seconds
  };

  // Add to favorite
  const handleAddToFavorite = (e, product) => {
    e.stopPropagation();
    setSelectedFavoriteItems((prevState) => ({
      favorite: [...prevState.favorite, product],
    }));
    navigate("/favoritepage");
  };

  const handleLoadMore = () => {
    setVisibleProductsCount((prevCount) => prevCount + 10);
  };

  if (isLoading) {
    return <div className="w-full min-h-screen"> {<LoadingAnimtion />} </div>;
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="w-full min-h-screen pt-5 text-center text-lg font-bold font-Monts">
        No Products Available
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-3 font-Monts">
      <div className="">
        <h1 className="text-sm uppercase text-[#444444] font-bold">
          {selectedData.gender}
        </h1>
        <div className="flex gap-2">
          <h1 className="text-xl uppercase text-black font-bold leading-4">
            {selectedData.bannerCate}
          </h1>
          <h1 className="text-sm text-[#898989] font-medium">
            {filteredProducts.length} Products
          </h1>
        </div>
      </div>

      <div className="mt-4">
        <form action="#">
          <label htmlFor="sort"></label>
          <select 
            name="sort" 
            id="sort" 
            onChange={sorting}
            className="py-2 px-4 text-sm placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline cursor-pointer"
          >
            <option value="lowest">Price(lowest)</option>
            <option value="highest">Price(highest)</option>
            <option value="a-z">Alphabate(a-z)</option>
            <option value="z-a">Alphabate(z-a)</option>
          </select>
        </form>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-9">
        {filteredProducts.slice(0, visibleProductsCount).map((product) => (
          <div 
            key={product._id} 
            className="flex-shrink-0 w-[45vw] cursor-pointer"
            onClick={() => navigate(`/singleproduct/${product._id}`)}
          >
            <div className="bg-slate-600 relative">
              <figure className="w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </figure>

              {product.quantity > 0 && (
              <div
                onClick={(e) => handleAddtoCart(e, product)}
                className={`absolute p-2 top-2 left-2 bg-[#ffffff] rounded-full cursor-pointer transition-all duration-300 ${clickedProducts[product._id] ? 'bg-green-500' : ''}`}
              >
                {clickedProducts[product._id] ? (
                  <IoCheckmarkCircleOutline fontSize={"1.1rem"} color="#ffffff" />
                ) : (
                  <IoBagAddOutline fontSize={"1.1rem"} />
                )}
              </div>
            )}

              <div 
                onClick={(e) => handleAddToFavorite(e,product)}
                className="absolute p-2 top-2 right-2 bg-[#ffffff] rounded-full cursor-pointer">
                <FaRegHeart fontSize={"0.9rem"} />
              </div>

              <div
                className={`${
                  product.featuredCategory?.name === "new appearals"
                    ? "absolute py-1 px-2 bottom-2 left-2 bg-[#ffffff] rounded-md text-xs font-semibold"
                    : "hidden"
                }`}
              >
                NEW
              </div>
            </div>

            {/* Product Details */}
            <div className="p-1">
              <h1 className="capitalize font-medium text-sm">
                {product.name.length > 20
                  ? `${product.name.substring(0, 20)}...`
                  : product.name}
              </h1>
              <h3 className="capitalize text-sm text-[#696969]">
                {product.clothCategory?.categoryName}
              </h3>
              <h1 className="font-medium">
                <Currency price={product.price} />
              </h1>
            </div>
          </div>
        ))}
      </div>
      
      {visibleProductsCount < filteredProducts.length && (
        <div className="flex justify-center mt-6">
          <button 
            onClick={handleLoadMore}
            className="py-2 px-4 bg-black text-white rounded-lg cursor-pointer"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default ViewAllProducts;
