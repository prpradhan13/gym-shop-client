import { useEffect, useReducer } from 'react';
import { FilterContext } from '../filter/filterContext';
import useProduct from '../../hooks/useProduct';
import reducer from '../../reducer/FilterReducer';

const initialState = {
    // allProducts: [],
    search: {
        text: ''
    },
    searchProducts: [],
    short_values: "lowest",
    sortFilterProducts: [],
}

function FilterContextProvider({children}) {
    const {allProductsData} = useProduct();
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({type: 'FILTER_DATA', payload: allProductsData});
    }, [allProductsData])

    // Search Handle
    const updateSearchValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        return dispatch({type: 'SEARCH_VALUE', payload:{name, value}})
    };

    useEffect(() => {
        dispatch({type: 'SEARCH_PRODUCTS'})
    }, [state.search])

    // Sorting
    const sorting = (e) => {
        const selectedValue = e.target.value;
        dispatch({ type: 'GET_SORT_VALUE', payload: selectedValue });
    };

    useEffect(() => {
        dispatch({type: 'GET_SORT_PRODUCTS'});
    },[state.short_values])

    // Clear search
    const clearSearch = () => {
        dispatch({type: 'CLEAR_SEARCH_PRODUCT'})
    }

    return (
        <FilterContext.Provider value={{...state, updateSearchValue, sorting, clearSearch}}>
            {children}
        </FilterContext.Provider>
      )
}

export default FilterContextProvider;