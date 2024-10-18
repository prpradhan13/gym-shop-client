import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useFavorite } from "../context/favorite/favoriteContext";
import Currency from "../utils/Corrency";
import { useCart } from "../context/cart/cartContext";
import { IoBagAddOutline } from "react-icons/io5";

function FavoritePage() {
  const [auth] = useUser();
  const { selectedFavoriteItems } = useFavorite();
  const { addToCart } = useCart();

  const navigate = useNavigate();

  const handleAddtoCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <>
      {auth.user ? (
        <div className="w-full p-3 flex flex-wrap gap-2">
          {selectedFavoriteItems.favorite.map((product) => {
            return (
              <div
                key={product._id}
                className="flex-shrink-0 w-[45vw]"
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

                  <div
                    onClick={(e) => handleAddtoCart(e, product)}
                    className="absolute p-2 top-2 left-2 bg-[#ffffff] rounded-full cursor-pointer"
                  >
                    <IoBagAddOutline fontSize={"1.1rem"} />
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
            );
          })}
        </div>
      ) : (
        <div className="font-Monts grid place-items-center pt-10">
          <h1 className="font-bold uppercase"> save to wishlist </h1>
          <p className="w-[450px] text-center text-[#595959] font-medium py-6">
            Ever wish you could save all your fave fits & accessories in one
            place to come back to later? Almost like a ✨ wishlist ✨.
          </p>
          <div className="grid w-[400px] gap-2 font-bold">
            <button
              onClick={() => navigate("/register")}
              className="uppercase py-3 bg-black text-white rounded-3xl"
            >
              create account
            </button>
            <button
              onClick={() => navigate("/register")}
              className="uppercase py-3 bg-[#5e5e5e] text-white rounded-3xl"
            >
              log in
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default FavoritePage;
