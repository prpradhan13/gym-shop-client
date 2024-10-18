import { useFeatu } from "../context/feature/featureContext";
import useFeatueCategory from "../hooks/useFeatureCategory";
import ProductCard from "./ProductCard";
import {useNavigate} from "react-router-dom";

function FeatureProdComp({ featureName, gender }) {
  const [selectedData, setSelectedData] = useFeatu();
  const {isFeatureLoading,isFeatureError} = useFeatueCategory();

  const navigate = useNavigate();

  if (isFeatureLoading) {
    return <div className="text-xl font-bold">Loading...</div>;
  }
  
  if (isFeatureError) {
    return <div className="text-xl font-bold text-red-500">Error: {isFeatureError}</div>;
  }

  return (
    <>
      <div className="w-full font-Monts py-10">
        <div className="">
          <div className="px-3 pb-5 lg:px-16 flex justify-between items-end">
            <h1 className="uppercase font-bold text-xl">{featureName}</h1>
            <button 
              onClick={() => {
                setSelectedData?.({...selectedData, bannerCate: featureName, gender: ''}); //To avoid potential errors, i use optional chaining when setting the new data in setselectedData.
                navigate("/viewallproducts");
              }} 
              className="underline font-semibold"
            >
              View All
            </button>
          </div>

          <div className="w-full pl-3">
            <ProductCard featureCategoryName={featureName}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeatureProdComp;
