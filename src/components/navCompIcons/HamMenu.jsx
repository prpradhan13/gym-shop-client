import { useEffect, useState } from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import NavCategoryImg from "./NavCategoryImg";
import { useFilter } from "../../context/filter/filterContext";
import { useNavigate } from "react-router-dom";

function HamMenu({ menuOpen, setMenuOpen, setIsSearchOpen }) {
  const [category, setCategory] = useState("women");
  const { clearSearch } = useFilter();
  
  const navigate = useNavigate()

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [menuOpen]);

  const handleClickSearchBox = () => {
    clearSearch();
    setIsSearchOpen(true);
  };

  const handleFavoriteClick = () => {
    setMenuOpen(false)
    navigate('/favoritepage')
  };

  return (
    <>
      <div className={menuOpen? "fixed z-[99] lg:hidden top-0 left-0 w-full h-screen duration-300 font-Monts": "hidden"}>
        <div className="bg-white p-5 h-full w-full">
          {/* ============== FAVORITE & CLOSE ICONS =================== */}
          <div className="flex justify-between items-center">
              <CiHeart 
                fontSize={"1.8rem"} 
                className="cursor-pointer"
                onClick={handleFavoriteClick}
              />
            <IoCloseOutline
              fontSize={"2rem"}
              className="cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          </div>

          <h1 className="uppercase font-bold text-lg my-4"> shop </h1>

          <div onClick={handleClickSearchBox} className="bg-[#f5f5f5] flex gap-1 items-center px-4 py-3 rounded-md">
            <IoSearchOutline fontSize={"1.5rem"} />
            <input
              type="text"
              placeholder="Search for a product"
              className="w-full bg-transparent text-sm font-medium outline-none border-none"
            />
          </div>

          <div className="w-full flex justify-evenly text-lg font-semibold my-4">
            <button onClick={() => setCategory("women")} className=""> Women&apos;s </button>
            <button onClick={() => setCategory("men")} className=""> Men&apos;s </button>
            <button onClick={() => setCategory("accessories")} className="">  Accessories </button>
          </div>

          <NavCategoryImg menuOpen={menuOpen} setMenuOpen={setMenuOpen} category={category} />
        </div>
      </div>
    </>
  );
}

export default HamMenu;
