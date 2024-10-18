const FeatureCateReducer = (state, action) => {
    switch (action.type) {
        case "FEATURE_CATEGORY_LOADING":
            return{
                ...state,
                isFeatureLoading: true,
            }

        case "FEATURE_CATEGORY_DATA":
            {
                const isFeaturedData = action.payload.filter((item) => item.isFeatured === true);
                // const menFeatureData = action.payload.filter((item) => item.featuredGender === "men")
                // const womenFeatureData = action.payload.filter((item) => item.featuredGender === "women")

                return {
                    ...state,
                    isFeatureLoading: false,
                    featureData: action.payload,
                    filterIsFeature: isFeaturedData,
                    // filterMenFeature: menFeatureData,
                    // filterWomenFeature: womenFeatureData
                }
            }

        case "FETURE_ERROR":
            return{
                ...state,
                isFeatureLoading: false,
                isFeatureError: true
            }

        default:
            return state
    }
}

export default FeatureCateReducer
