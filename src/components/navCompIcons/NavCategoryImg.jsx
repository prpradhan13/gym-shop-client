import { useEffect, useState } from "react";
import womenImg1 from "/navImg/nav_w_img.avif";
import womenImg2 from "/navImg/nav_w_img2.avif";
import menImg1 from "/navImg/nav_m_img.avif";
import menImg2 from "/bannerImgs/first_home_large.avif";
import accessoryImg from "/navImg/nav_a_img.avif";
import { useFeatu } from "../../context/feature/featureContext";
import { useNavigate } from "react-router-dom";

function NavCategoryImg({ category, setMenuOpen }) {
  const [bgImg, setBgImg] = useState({
    img1: "",
    img2: "",
    gender: "",
    title1: "",
    title2: "",
  });
  const [selectedData, setSelectedData] = useFeatu();
  
  const navigate = useNavigate();

  useEffect(() => {
    switch (category) {
      case "women":
        setBgImg({ img1: womenImg1, img2: womenImg2, gender: "women", title1: "leggings", title2: "new appearals" });
        break;
      case "men":
        setBgImg({ img1: menImg1, img2: menImg2, gender: "men", title1: "shorts", title2: "new appearals" });
        break;
      case "accessories":
        setBgImg({ img1: accessoryImg, title1: "training app" });
        break;
      default:
        setBgImg({ img1: "", img2: "" });
    }
  }, [category]);

  return (
    <div className="overflow-auto scrollbar-hide">
      <div className="flex gap-2 min-w-[160vw]">
        <div 
          style={{backgroundImage: `url(${bgImg.img1})`}} 
          onClick={() => {
            setSelectedData?.({...selectedData, bannerCate: bgImg.title1, gender: bgImg.gender}); 
            navigate(`${bgImg.title1 === 'leggings' ? '/leggingspage' : '/viewallproducts'}`); 
            setMenuOpen(false)}
          }
          className="cursor-pointer w-[95vw] h-[40vh] relative rounded-md bg-center bg-cover bg-no-repeat overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#00000067] to-transparent"></div>
          <h1 className="absolute bottom-4 left-3 uppercase text-white text-lg font-semibold"> {bgImg.title1} </h1>
        </div>

        <div 
          style={{backgroundImage: `url(${bgImg.img2})`}} 
          onClick={() => {
            setSelectedData?.({...selectedData, bannerCate: bgImg.title2, gender: bgImg.gender}); 
            navigate("/viewallproducts"); 
            setMenuOpen(false)}
          } 
          className="cursor-pointer w-[89vw] h-[40vh] relative rounded-md bg-center bg-cover bg-no-repeat overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#00000067] to-transparent"></div>
          <h1 className="absolute bottom-4 left-3 uppercase text-white text-lg font-semibold"> {bgImg.title2} </h1>
        </div>
      </div>
    </div>
  )
}

export default NavCategoryImg;
