import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useCart } from "../../context/cart/cartContext";
import IsCartOpen from "../cartcomponents/IsCartOpen";
import CartClose from "../cartcomponents/CartClose";

function CartComp({isCartOpen, setIsCartOpen}) {
  const {cartItems} = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isCartOpen]);

  return (
    <div 
      className={`${isCartOpen ? 'w-full h-screen fixed bg-[#000000c9] z-[999] top-0' : 'hidden'}`}
      onClick={() => setIsCartOpen(false)}
    >
      <div 
        className='bg-white absolute rounded-t-lg w-full h-[90vh] bottom-0 px-3 py-2 font-Monts overflow-y-auto cart-scrollbar'
        onClick={(e) => e.stopPropagation()} // Prevents the click event from propagating to the background
      >
        <h1 className="uppercase font-bold text-center"> your bag </h1>
        <IoCloseOutline
          fontSize={"2rem"}
          className="cursor-pointer absolute top-1 right-2"
          onClick={() => setIsCartOpen(false)}
        />

        {cartItems.length > 0 ? <IsCartOpen setIsCartOpen={setIsCartOpen} /> : <CartClose setIsCartOpen={setIsCartOpen} />}
      </div>
    </div>
  )
}

export default CartComp
