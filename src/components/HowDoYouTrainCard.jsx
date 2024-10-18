import { useFeatu } from "../context/feature/featureContext"; 
import { useNavigate } from "react-router-dom"

function HowDoYouTrainCard({ image, title, gender }) {
    const [selectedData, setSelectedData] = useFeatu();

    const navigate = useNavigate();

  return (
    <div className='py-3'>
      <div className="w-[80vw] h-[73vh] relative rounded-md overflow-hidden">
        <div style={{backgroundImage: `url(${image})`}} className="w-full h-full bg-cover bg-no-repeat"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000e0] to-transparent"></div>

        <div className="absolute bottom-9 left-5">
            <h1 className="font-bold uppercase text-white text-xl"> {title} </h1>
            <button
                onClick={() => {
                    setSelectedData?.({...selectedData, bannerCate: title, gender}); //To avoid potential errors, i use optional chaining when setting the new data.
                    navigate('/viewallproducts');
                }}
                className="uppercase bg-white font-bold rounded-full px-6 py-3 mt-3 text-sm"
            > 
                shop {title} 
            </button>  
        </div>
      </div>
    </div>
  )
}

export default HowDoYouTrainCard
