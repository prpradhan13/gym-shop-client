import { createContext, useContext } from "react";

export const FeatureContext = createContext();

export const useFeatu = () => {
    return useContext(FeatureContext)
};