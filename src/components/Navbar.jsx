import logo from '../assets/gs-icon-black.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoSearchOutline, IoBagOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from 'react';
import HamMenu from './navCompIcons/HamMenu';
import SearchComp from './navCompIcons/SearchComp';
import { FiUser } from "react-icons/fi";
import CartComp from './navCompIcons/CartComp';
import { useCart } from '../context/cart/cartContext';
import { useFilter } from '../context/filter/filterContext';
import { useUser } from '../context/userContext';

function Navbar() {
  const [bgChange, setBgChange] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {cartItems} = useCart();
  const { clearSearch } = useFilter();
  const {auth, loading} = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    const changeNavbarBg = () => {
      if(window.scrollY >= 76){
        setBgChange(true);
      } else {
        setBgChange(false);
      }
    }

    window.addEventListener('scroll', changeNavbarBg)

    return () => {
      window.removeEventListener('scroll', changeNavbarBg);
    };
  }, [])

  const handleClickSearchIcon = () => {
    clearSearch();
    setIsSearchOpen(true);
  };

  // Function to get initials from the full name
  const getInitials = (fullName) => {
    if (!fullName) return '';
    const nameParts = fullName.split(' ');
    if (nameParts.length === 1) {
      // If there is only one word (no spaces), return the first two characters
      return fullName.slice(0, 2).toUpperCase();
    }
    return nameParts
      .map(name => name[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
    <nav className={`w-full px-3 py-3 lg:px-16 fixed top-0 flex ${bgChange ? 'backdrop-blur-xl bg-neutral-50 bg-opacity-20' : 'bg-white'} z-[9] duration-300`}>
      <div className="flex items-center w-full lg:w-[55vw] justify-between">

        {/* ================= FOR MOBILE AND MIDDUM SCREEN =============== */}
        <div className="flex lg:hidden gap-5">
          <RxHamburgerMenu fontSize={'1.5rem'} onClick={() => setMenuOpen(true)} className='cursor-pointer'/>
          <IoSearchOutline fontSize={'1.5rem'} onClick={handleClickSearchIcon} className='lg:hidden md:flex cursor-pointer' />
        </div>

        <figure className="">
            <img src={logo} className='h-[6vh] md:h-[4vh] lg:h-[6vh]' alt="Logo"/>
        </figure>

        <div className="flex items-center lg:hidden gap-5">
          <div className="">
            {!loading && auth.user ? (
              <div
                onClick={() => navigate('/userroute/userdashboard')}
                className='bg-black px-2 py-1 rounded-full text-white text-center font-semibold cursor-pointer text-lg'
              >
                {getInitials(auth.user.fullName)}
              </div>
            ) : (
              <FiUser fontSize={'1.5rem'} onClick={() => navigate('/register')} className='cursor-pointer'/>
            )}
          </div>

          <div 
            onClick={() => setIsCartOpen(true)}
            className="relative cursor-pointer"
          >
            <IoBagOutline fontSize={'1.5rem'} className=''/>
            <span className='absolute bg-blue-500 rounded-full text-center w-[16px] h-[16px] text-xs font-semibold -top-1 -right-1'> 
              {cartItems.reduce((total, cartItem) => total + cartItem.cartQuantity, 0)}
              {/* {cartItems.length > 0 ? cartItems.length : 0} */}
            </span>
          </div>
        </div>
        
        {/* ================= FOR LARGE SCREEN =============== */}
        <div className="hidden font-Monts font-bold text-base lg:flex gap-5">
            <NavLink to={'/womensection'} className={({isActive}) => `${isActive ? 'text-zinc-600' : 'text-black'} cursor-pointer`}> WOMEN </NavLink>
            <NavLink to={'/mensection'} className={({isActive}) => `${isActive ? 'text-zinc-600' : 'text-black'} cursor-pointer`}>MEN</NavLink>
            <NavLink to={'/accessorysection'} className={({isActive}) => `${isActive ? 'text-zinc-600' : 'text-black'} cursor-pointer`}>ACCESSORIES</NavLink>
        </div>
      </div>

      {/* ================= FOR LARGE SCREEN =============== */}
      <div className="hidden lg:w-[35vw] lg:flex items-center justify-end gap-5">
        {/* =============== SEARCH ================= */}
        <div className="hidden bg-[#f5f5f5] lg:flex gap-1 items-center px-4 py-3 rounded-md cursor-pointer">
          <IoSearchOutline fontSize={'1.5rem'} />
          <input type="text" placeholder='Search for a product' className='w-40 bg-transparent text-base font-medium outline-none border-none' />
        </div>

        {/* =============== ICONS =================== */}
        <div className="hidden lg:flex gap-5">
          <CiHeart fontSize={'1.4rem'} className='cursor-pointer'/>
          <FiUser fontSize={'1.4rem'} onClick={() => navigate('/register')} className='cursor-pointer'/>
          <IoBagOutline fontSize={'1.4rem'} className='cursor-pointer'/>
        </div>
      </div>
    </nav>

    <HamMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} setIsSearchOpen={setIsSearchOpen} />
    {isSearchOpen && <SearchComp isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} setMenuOpen={setMenuOpen} />}
    {isCartOpen && <CartComp isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />}
    </>
  )
}

export default Navbar
