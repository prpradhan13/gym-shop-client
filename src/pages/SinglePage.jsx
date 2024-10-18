import { useEffect, useState } from "react";
import useProduct from "../hooks/useProduct";
import { useNavigate, useParams } from "react-router-dom";
import Currency from "../utils/Corrency";
import { useCart } from "../context/cart/cartContext";
import { IoBagAddOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";

function SinglePage() {
  const [relatedData, setRelatedData] = useState([]);
  const { getSingleProduct, singleProduct, isSingleLoading, allProductsData } =
    useProduct();
  const { addToCart } = useCart();
  const { id } = useParams();

  const navigate = useNavigate();


  useEffect(() => {
    getSingleProduct(id);
  }, [id, getSingleProduct]);

  useEffect(() => {
    const relatedProduct = allProductsData.filter((rProd) => {
      return (
        rProd?.clothCategory?.categoryName ===
        singleProduct?.clothCategory?.categoryName
      );
    });
    setRelatedData(relatedProduct);
}, [singleProduct, allProductsData]);

  const handleRelateProductAddToCart = (e, relProd) => {
    e.stopPropagation();
    addToCart(relProd);
  }

  if (isSingleLoading) {
    return <div>Loading...</div>;
  }

  if (!singleProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <figure className="w-full h-[80vh]">
        <img src={singleProduct.image} alt={singleProduct.name} className="w-full h-full"/>
      </figure>
      <div className="text-center font-Monts p-5">
        <h1 className="font-bold uppercase text-xl">{singleProduct.name}</h1>
        <p className="text-[#7b7b7b] capitalize">
          {singleProduct.clothCategory?.categoryName}
        </p>
        <p className="font-semibold text-[#292929]">
          <Currency price={singleProduct.price} />
        </p>

        <div className="w-full grid place-items-center gap-3 mt-6">
          <button onClick={() => addToCart(singleProduct)} className="uppercase bg-blue-500 text-white font-semibold w-[300px] py-3 rounded-3xl">
            add to cart
          </button>
          <button className="uppercase bg-black text-white font-semibold w-[300px] py-3 rounded-3xl">
            add to favorite
          </button>
        </div>
      </div>

      {relatedData.length > 0 ? (
        <div className="pl-3 mt-10">
            <div className="uppercase font-bold text-xl ">
                you might like
            </div>
            <div className="mt-2 scrollbar-container w-full flex gap-4 overflow-x-hidden cursor-pointer">
            {relatedData.slice(0,4).map((rp) => {
                return (
                <div key={rp._id} className="pb-5" 
                    onClick={() => navigate(`/singleproduct/${rp._id}`)}
                >
                    <div className="relative">
                        <figure className="w-[60vw] sm:w-[50vw] md:w-[30vw] lg:w-[25vw]">
                        <img
                            src={rp.image}
                            alt={rp.productName}
                            className="w-full h-full"
                        />
                        </figure>
                        {rp.quantity > 0 && (
                        <div
                            onClick={(e) => handleRelateProductAddToCart(e, rp)}
                            className="absolute p-2 top-2 left-2 bg-[#ffffff] rounded-full"
                        >
                            <IoBagAddOutline fontSize={"1.1rem"} />
                        </div>
                        )}
                        <div className="absolute p-2 top-2 right-2 bg-[#ffffff] rounded-full">
                        <FaRegHeart fontSize={"0.9rem"} />
                        </div>
                    </div>

                    <div className="p-2">
                    <h1 className="capitalize font-medium">{rp.name}</h1>
                    <h3 className="capitalize text-[#929292] font-medium">
                        {rp.clothCategory.categoryName}
                    </h3>
                    <h1 className="font-semibold text-base">
                        <Currency price={rp.price} />
                    </h1>
                    </div>
                </div>
                );
            })}
            </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SinglePage;
