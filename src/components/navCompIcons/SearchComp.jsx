import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useFilter } from "../../context/filter/filterContext.js";
import Currency from "../../utils/Corrency.jsx";
import { useNavigate } from "react-router-dom";
import { useFeatu } from "../../context/feature/featureContext.js";
import { IoBagAddOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import {useCart} from "../../context/cart/cartContext.js";
import useDebounce from "../../hooks/useDebounce.js";

function SearchComp({ isSearchOpen, setIsSearchOpen, setMenuOpen }) {
  const {
    searchProducts,
    search: { text },
    updateSearchValue,
    clearSearch
  } = useFilter();
  const [selectedData, setSelectedData] = useFeatu();
  const {addToCart} = useCart();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState(text);
  const debouncedSearchText = useDebounce(searchText, 300); // 300ms debounce delay

  useEffect(() => {
    if(debouncedSearchText){
      updateSearchValue({ target: { name: "text", value: debouncedSearchText } })
    }
  }, [debouncedSearchText]);

  const handleChange = (e) => {
    setSearchText(e.target.value); // Update local state, debounce will handle updating the search state
  };

  useEffect(() => {
    if (isSearchOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isSearchOpen]);

  const handleArrowClick = ({selectedText='', selectedGender=''}) => {
    setSelectedData?.({ ...selectedData, bannerCate: selectedText, gender: selectedGender });
    navigate("/viewallproducts");
    setIsSearchOpen(false);
    setMenuOpen(false);
  };

  const handleProductClick = (productId) => {
    navigate(`/singleproduct/${productId}`);
    setIsSearchOpen(false);
    setMenuOpen(false);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleClickBackToSearch = () => {
    clearSearch();
    setIsSearchOpen(false);
  };

  return (
    <>
      <div className="w-full h-screen fixed top-0 z-[999] p-3 bg-white">
        <div className="w-full p-3 flex items-center gap-2">
          <MdKeyboardArrowLeft
            fontSize={"2.8rem"}
            onClick={handleClickBackToSearch}
            className="cursor-pointer"
            aria-label="Close Search"
            role="button"
          />
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full p-2 flex items-center gap-2 bg-[#e7e7e7] rounded-md border-[#363636] border-2"
          >
            <IoSearchOutline fontSize={"1.3rem"} className="" />
            <input
              type="text"
              name="text"
              placeholder="Search for a Product"
              value={searchText}
              onChange={handleChange}
              className="bg-transparent text-base w-full outline-none"
              aria-label="Search Input"
            />
          </form>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-7rem)] scrollbar-hide py-3">
          {searchProducts.length > 0 ? (
            <div className="">
              <div className="flex justify-between">
                <h1 className="uppercase font-bold text-lg"> products </h1>
                <button
                  onClick={() => handleArrowClick({selectedText:text})}
                  className="underline"
                >
                  View all <span className="font-bold"> {text} </span>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5">
                {searchProducts.slice(0, 4).map((product) => (
                  <div
                    key={product._id}
                    className="cursor-pointer"
                    onClick={() => handleProductClick(product._id)}
                  >
                    <div className="relative w-full">
                      <figure className="w-full">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </figure>
                      {product.quantity > 0 && (
                        <div
                          onClick={(e) => handleAddToCart(e, product)}
                          className="absolute p-2 top-2 left-2 bg-[#ffffff] rounded-full cursor-pointer"
                        >
                          <IoBagAddOutline fontSize={"1.1rem"} />
                        </div>
                      )}
                      <div className="absolute p-2 top-2 right-2 bg-[#ffffff] rounded-full cursor-pointer">
                        <FaRegHeart fontSize={"0.9rem"} />
                      </div>

                      <div
                        className={`${
                          product.featuredCategory.name === "new appearals"
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
            </div>
          ) : (
            <div className="text-xl font-bold capitalize grid place-items-center pt-5">
              <div className="w-[80vw]">
                <hr className="bg-[#4f4f4f]" />
                <div className="flex items-center justify-between py-3">
                  women&apos;s section
                  <button
                    onClick={() => handleArrowClick({selectedGender:"women"})}
                    aria-label="Go to women's section"
                    className="bg-black rounded-full grid place-items-center p-1"
                  >
                    <MdKeyboardArrowRight className="text-[1.5rem] text-white" />
                  </button>
                </div>

                <hr className="bg-[#4f4f4f]" />
                <div className="flex items-center justify-between py-3">
                  men&apos;s section
                  <button
                    onClick={() => handleArrowClick({selectedGender:"men"})}
                    aria-label="Go to women's section"
                    className="bg-black rounded-full grid place-items-center p-1"
                  >
                    <MdKeyboardArrowRight className="text-[1.5rem] text-white" />
                  </button>
                </div>

                <hr className="bg-[#4f4f4f]" />
                <div className="flex items-center justify-between py-3">
                  accessory&apos;s section
                  <button className="bg-black rounded-full grid place-items-center p-1">
                    <MdKeyboardArrowRight className="text-[1.5rem] text-white" />
                  </button>
                </div>
                <hr className="bg-[#4f4f4f]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchComp;
