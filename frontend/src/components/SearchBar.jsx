import React from 'react'
import { useContext ,useEffect,useState} from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';
function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location=useLocation();
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if(location.pathname.includes('collection') ){
        setVisible(true);
    }
    else{
        setVisible(false);
    }
    
  }, [location])
  

  return showSearch && visible? (
    <div className="   text-center my-5">
        <div className='inline-flex items-center justify-center border border-gray-400 px-4 py-2 mx-3 rounded-full w-3/4 sm:w-1/2'>  
            <input
            className='flex-1 outline-none bg-inherit text-sm sm:text-base'
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
        />
        <img  src={assets.search_icon} className='w-4' alt="" />
        </div>
        <img onClick={()=>setShowSearch(false)} src={assets.cross_icon} className='w-3 inline cursor-pointer' alt="" />
      
    </div>
  ):null
}

export default SearchBar
