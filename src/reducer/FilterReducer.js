const FilterReducer = (state, action) => {
  switch (action.type) {
    case 'FILTER_DATA':
      return {
          ...state,
          sortFilterProducts: [...action.payload],
          // allProducts: [...action.payload],
      }

    case 'SEARCH_VALUE': {
      const {name, value} = action.payload

      return {
        ...state,
        search: {...state.search, [name] : value}
      }
    }

    case 'SEARCH_PRODUCTS': {
      let {sortFilterProducts} = state
      let tempSearchData = [...sortFilterProducts]

      const {text} = state.search
      if(text){
        tempSearchData = tempSearchData.filter((curElem) => {
          return curElem?.name.toLowerCase().includes(text.toLowerCase()) || curElem?.clothCategory?.categoryName.toLowerCase().includes(text.toLowerCase());
        })
      } else if(text === '') {
        tempSearchData = []
      }

      return {
        ...state,
        searchProducts: tempSearchData
      }
    }

    case 'CLEAR_SEARCH_PRODUCT': {
      return {
        ...state,
        search: {
          text: ''
        },
        searchProducts: []
      }
    }
    
    case 'GET_SORT_VALUE': {
      return {
        ...state,
        short_values: action.payload,
      }
    }

    case 'GET_SORT_PRODUCTS': {
      let newSortData;
      const {sortFilterProducts, short_values} = state
      let tempSortData = [...sortFilterProducts];

      const shortingProducts = (a,b) => {
        // console.log(typeof(a.price,b.price));
        switch(short_values) {
          case 'lowest': return a.price - b.price;
          case 'highest': return b.price - a.price;
          case 'a-z': return a.name.localeCompare(b.name);
          case 'z-a': return b.name.localeCompare(a.name);
          default: return 0;
        }
      };

      newSortData = tempSortData.sort(shortingProducts)
      return {
        ...state,
        sortFilterProducts: newSortData
      }
    }

    default:
      return state;
  }
};

export default FilterReducer;
