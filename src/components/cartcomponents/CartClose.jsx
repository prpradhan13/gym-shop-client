import EmptyBag from "/extraImgs/empty-bag.svg";
import { useNavigate } from "react-router-dom";

function CartClose({setIsCartOpen}) {

  const navigate = useNavigate();

  const handleShopMen = () => {
    navigate('/mensection');
    setIsCartOpen(false);
  }

  const handleShopWoMen = () => {
    navigate('/womensection');
    setIsCartOpen(false);
  }

  return (
    <div className="w-full h-[70vh] grid place-items-center">
      <div className="font-Monts grid place-items-center">
        <figure>
            <img src={EmptyBag} alt="emptyBag" className=""/>
            <figcaption className="uppercase font-bold mt-5">your bag is empty</figcaption>
        </figure>
        <p className="text-sm text-[#636363] font-semibold"> There are no products in your bag </p>

        <div className="grid gap-2 mt-3 w-[200px]">
            <button
              className="uppercase bg-black text-white font-bold rounded-3xl text-center py-3"
              onClick={handleShopMen}
            >
              shop mens
            </button>
            <button 
              className="uppercase bg-black text-white font-bold rounded-3xl text-center py-3"
              onClick={handleShopWoMen}
            >
              shop womens
            </button>
        </div>
      </div>
    </div>
  )
}

export default CartClose
