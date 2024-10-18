import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import {useFeatu} from "../context/feature/featureContext"

// Debounce function to limit the rate at which a function can fire
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function HomeBGImgComp({
  mainImg,
  mobileBgImg,
  bannerName,
  bannerCate,
  bannerPara,
  bannerBtn1,
  bannerBtn2,
}) {
  const [bgImg, setBgImg] = useState(mainImg);
  const [selectedData, setSelectedData] = useFeatu();

  const navigate = useNavigate();

  const updateBgImg = useCallback(() => {
    if (window.innerWidth < 768) {
      setBgImg(mobileBgImg);
    } else {
      setBgImg(mainImg);
    }
  }, [mainImg, mobileBgImg]);

  useEffect(() => {
    // Debounced update function
    const debouncedUpdateBgImg = debounce(updateBgImg, 100);

    // Initial check to set the background image on component mount
    debouncedUpdateBgImg();

    // Add event listener
    window.addEventListener("resize", updateBgImg);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", updateBgImg);
  }, [updateBgImg]);

  return (
    <>
      <div className="relative w-full h-[95vh] lg:h-[75vh]">
        <div
          style={{ backgroundImage: `url(${bgImg})` }}
          className="absolute inset-0 bg-no-repeat bg-cover md:bg-center lg:bg-cover"
        >
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#00000067] to-transparent"></div>

          <div className="w-full absolute bottom-8 md:bottom-24 px-3 lg:px-16 text-white flex flex-col gap-5 font-Monts text-left">
            <h1 className="uppercase text-[1.8rem] md:text-[4rem] lg:text-[2.5rem] font-extrabold leading-6">
              {bannerName}
            </h1>
            <p className="leading-4 text-base md:w-[500px]">
              {bannerPara}
            </p>

            {bannerBtn1 || bannerBtn2 ? (
              <div className="flex flex-col lg:flex-row gap-2">
                <button
                  onClick={() => {
                    setSelectedData?.({...selectedData, bannerCate, gender:"women"}); //To avoid potential errors, i use optional chaining when setting the new data in setSelectedData.
                    navigate("/viewallproducts")
                  }} 
                  className="w-full bg-white text-black hover-effect ease-in-out delay-150 duration-300 md:text-lg lg:text-base font-bold py-3 px-4 rounded-3xl md:w-[30vw] lg:w-[10vw] capitalize"
                >
                  {bannerBtn1}
                </button>
                <button 
                  onClick={() => {
                    setSelectedData?.({...selectedData, bannerCate, gender:"men"});
                    navigate("/viewallproducts")
                  }}
                  className={`${bannerBtn2 === '' ? "hidden" : "w-full bg-white text-black hover-effect ease-in-out delay-150 duration-300 md:text-lg lg:text-base font-bold py-3 px-4 rounded-3xl md:w-[30vw] lg:w-[10vw] capitalize"}`}
                >
                  {bannerBtn2}
                </button>
              </div>
            ) : ('')}
            
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeBGImgComp;
