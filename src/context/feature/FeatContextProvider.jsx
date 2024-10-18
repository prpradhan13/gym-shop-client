import { useState } from 'react';
import { FeatureContext } from './featureContext';

function FeatContextProvider({children}) {
    const [selectedData, setSelectedData] = useState({
        bannerCate: "",
        gender: "",
    });

    return (
        <FeatureContext.Provider value={[selectedData, setSelectedData]}>
            {children}
        </FeatureContext.Provider>
      )
}

export default FeatContextProvider
