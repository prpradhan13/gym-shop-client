import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {UserContextProvider} from './context/UserContextProvider.jsx'
import FeatContextProvider from './context/feature/FeatContextProvider.jsx'
import FilterContextProvider from './context/filter/FilterContextProvider.jsx'
import { CartContextProvider } from './context/cart/CartContextProvider.jsx'
import FavoriteContextProvider from './context/favorite/FavoriteContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserContextProvider>
        <FilterContextProvider>
            <FeatContextProvider>
                <CartContextProvider >
                    <FavoriteContextProvider>
                        <App />
                    </FavoriteContextProvider>
                </CartContextProvider>
            </FeatContextProvider>
        </FilterContextProvider>
    </UserContextProvider>
)
