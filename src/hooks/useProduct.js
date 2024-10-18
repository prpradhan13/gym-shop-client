import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function useProduct() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSingleLoading, setIsSingleLoading] = useState(true);
    const [allProductsData, setAllProductsData] = useState([]);
    const [featureProducts, setFeatureProducts] = useState([]);
    const [singleProduct, setSingleProduct] = useState();
    
    const getAllData = async () => {
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/allproducts`);
            setAllProductsData(data.allProducts)
            const featureData = data.allProducts.filter((item) => item.isFeatured === true)
            setFeatureProducts(featureData);

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAllData();
    }, [])

    const getSingleProduct = useCallback(async (id) => {
        setIsSingleLoading(true);
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/allproducts?prodId=${id}`);
            
            setSingleProduct(data.product);
        } catch (error) {
            console.log(error);
        } finally {
            setIsSingleLoading(false);
        }
    }, []);

  return {isLoading, allProductsData, featureProducts, isSingleLoading, singleProduct, getSingleProduct};
}
