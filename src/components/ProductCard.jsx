import { IoBagAddOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { useEffect, useMemo, useState } from "react";
import useProduct from "../hooks/useProduct";
import Currency from "../utils/Corrency";
import { useCart } from "../context/cart/cartContext";
import { useFavorite } from "../context/favorite/favoriteContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LazyLoad from 'react-lazyload';

function ProductCard({ featureCategoryName }) {
  const [featureProductData, setFeatureProductData] = useState([]);
  const [clickedProducts, setClickedProducts] = useState({});
  const { featureProducts, isLoading } = useProduct();
  const { addToCart } = useCart();
  const { setSelectedFavoriteItems } = useFavorite();

  const navigate = useNavigate();

  // Memoize the filtered product data
  const filteredProducts = useMemo(() => {
    if (featureProducts) {
      return featureProducts.filter(
        (item) => item.featuredCategory.name === featureCategoryName
      );
    }
    return [];
  }, [featureProducts, featureCategoryName]);

  // Update state only when filtered products change
  useEffect(() => {
    setFeatureProductData(filteredProducts);
  }, [filteredProducts]);

  // Add to cart
  const handleAddToCart = (e, item) => {
    e.stopPropagation(); // Stop event propagation

    if (clickedProducts[item._id]) return; // Prevent multiple clicks

    setClickedProducts(prevState => ({
      ...prevState,
      [item._id]: true,
    }));

    toast.success("Item added to cart");
    addToCart(item);

    setTimeout(() => {
      setClickedProducts(prevState => ({
        ...prevState,
        [item._id]: false,
      }));
    }, 2000); // Revert icon back after 2 seconds
  };

  // Add to favorite
  const handleAddToFavorite = (e, item) => {
    e.stopPropagation();
    setSelectedFavoriteItems((prevState) => ({
      favorite: [...prevState.favorite, item],
    }));
    navigate("/favoritepage");
  };

  if (isLoading) {
    return <div className="text-xl text-center font-bold"> Loading... </div>;
  }

  if (featureProductData.length === 0) {
    return <div className="text-xl font-bold">No products available.</div>;
  }

  return (
    <div className="w-full">
      <div className="scrollbar-container w-full flex gap-4 overflow-x-hidden cursor-pointer">
        {featureProductData.map((item) => (
          <div
            key={item._id}
            className="flex-shrink-0 relative"
            onClick={() => navigate(`/singleproduct/${item._id}`)}
          >
            <figure className="w-[80vw] sm:w-[50vw] md:w-[30vw] lg:w-[25vw]">
              <LazyLoad height={200}>
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-full h-full"
                />

              </LazyLoad>
            </figure>
            {item.quantity > 0 && (
              <div
                onClick={(e) => handleAddToCart(e, item)}
                className={`absolute p-2 top-2 left-2 bg-[#ffffff] rounded-full transition-all duration-300 ${clickedProducts[item._id] ? 'bg-green-500' : ''}`}
              >
                {clickedProducts[item._id] ? (
                  <IoCheckmarkCircleOutline fontSize={"1.1rem"} color="#ffffff" />
                ) : (
                  <IoBagAddOutline fontSize={"1.1rem"} />
                )}
              </div>
            )}
            <div
              onClick={(e) => handleAddToFavorite(e, item)}
              className='absolute p-2 top-2 right-2 bg-[#ffffff] rounded-full'
            >
              <FaRegHeart fontSize={"0.9rem"} />
            </div>
            <div className="p-2">
              <h1 className="capitalize font-medium">{item.name}</h1>
              <h3 className="capitalize text-[#929292] font-medium">
                {item.clothCategory.categoryName}
              </h3>
              <h1 className="font-semibold text-base">
                <Currency price={item.price} />
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;
