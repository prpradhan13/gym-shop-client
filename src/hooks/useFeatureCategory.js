import axios from "axios";
import { useEffect, useReducer } from "react";
import FeatureCateReducer from "../reducer/FeatureCateReducer";

const initialState = {
    isFeatureLoading: false,
    isFeatureError: false,
    featureData: [],
    filterIsFeature: [],
    filterMenFeature: [],
    filterWomenFeature: [],
}

const useFeatueCategory = () => {
    const [sate, dispatch] = useReducer(FeatureCateReducer, initialState)

    const getAllData = async () => {
        dispatch({type: "FEATURE_CATEGORY_LOADING"})
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/featuredCategory/allfeaturedcategories`)
            const allFeatureData = data.allFeaturedCategory
            // console.log("allFeatureData: ", data.featuredCategory);
            dispatch({type: "FEATURE_CATEGORY_DATA", payload: allFeatureData})
            
        } catch (error) {
            console.log(error);
            dispatch({type: "FETURE_ERROR"})
        }
    };

    useEffect(() => {
        getAllData();
    }, []);

    return {...sate}
};

export default useFeatueCategory;