import { CiHeart } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { useCart } from "../../context/cart/cartContext";
import { FaPlus, FaMinus } from "react-icons/fa6";
import Currency from "../../utils/Corrency";
import { useFavorite } from "../../context/favorite/favoriteContext";
import { useNavigate } from "react-router-dom";
import PaymentCardComp from "../PaymentCardComp";
import { useCallback, useMemo } from "react";

function IsCartOpen({ setIsCartOpen }) {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const { setSelectedFavoriteItems } = useFavorite();
  const navigate = useNavigate();

  // Cart Pricing Control
  const freeShippingAbovePrice = 5000;

  const total = useMemo(() => {
    return cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.cartQuantity,
      0
    );
  }, [cartItems]);

  const shippingCharges = useMemo(() => (total >= freeShippingAbovePrice ? 0 : 100), [total]);
  
  const subTotal = useMemo(() => total + shippingCharges, [total, shippingCharges]);

  const isFreeShipping = total >= freeShippingAbovePrice;

  // Inline functions in JSX can cause unnecessary re-renders. You can move them outside the JSX or use useCallback to memoize these handlers.
  const handleDecreaseQuantity = useCallback((id) => {
    decreaseQuantity(id);
  }, [decreaseQuantity]);
  
  const handleIncreaseQuantity = useCallback((id) => {
    increaseQuantity(id);
  }, [increaseQuantity]);
  
  const handleRemoveFromCart = useCallback((id) => {
    removeFromCart(id);
  }, [removeFromCart]);

  const handleAddToFavorite = useCallback((item) => {
    setSelectedFavoriteItems((prevState) => ({
      favorite: [...prevState.favorite, item],
    }));
    navigate("/favoritepage");
    setIsCartOpen(false);
  }, [navigate, setSelectedFavoriteItems, setIsCartOpen]);

  return (
    <>
      <p className="py-3 text-sm font-Monts font-semibold text-center text-[#696969]">
        {isFreeShipping ? <>
          ✨ YAY!!! you get <span className="text-green-500 uppercase"> free </span> shipping ✨
        </> : <>
          ✨ Add upto <span className="text-green-500"> <Currency price={5000} /> </span> get free shipping ✨
        </>}
      </p>
      
      {/* Products in Cart */}
      {cartItems.map((item) => (
        <div
          key={item._id}
          className="flex gap-2 py-4 border-b border-gray-200"
        >
          <figure className="">
            <img src={item.image} alt={item.name} className="h-[200px]" />
          </figure>
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-lg font-semibold capitalize">{item.name}</h1>
              <h1 className="font-semibold text-base">
                <Currency price={item.price} />
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => handleDecreaseQuantity(item._id)}>
                <FaMinus />
              </button>
              <span>{item.cartQuantity}</span>
              <button onClick={() => handleIncreaseQuantity(item._id)}>
                <FaPlus />
              </button>
            </div>
            <div className="flex gap-4 mt-2">
              <CiHeart
                fontSize={"1.6rem"}
                className="cursor-pointer"
                onClick={() => handleAddToFavorite(item)}
              />
              <RiDeleteBinLine
                fontSize={"1.5rem"}
                className="cursor-pointer"
                onClick={() => handleRemoveFromCart(item._id)}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Cart Items Total Calculation */}
      <div className="w-full p-6 font-Monts border-b border-gray-200">
        <h1 className="font-semibold text-[#717171] text-base">
          Total
          <span className="float-right font-bold text-black">
            <Currency price={total} />
          </span>
        </h1>
        <h1 className="font-semibold text-[#717171]">
          Shipping Charge
          <span className="float-right font-bold text-black">
            {total >= freeShippingAbovePrice ? (
              <span className="text-green-500">FREE</span>
            ) : (
              <Currency price={shippingCharges} />
            )}
          </span>
        </h1>
        <h1 className="font-semibold text-[#717171]">
          Sub Total
          <span className="float-right font-bold text-black">
            <Currency price={subTotal} />
          </span>
        </h1>
      </div>

      <PaymentCardComp />
    </>
  );
}

export default IsCartOpen;
