import React, { useEffect, useState } from 'react'
import Profiledropdown from '../components/cores/Profiledropdown'
import { Link,  } from 'react-router-dom'
 import navbarlink from '../../data/navebarlink'
 import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowAltCircleDown, FaCartArrowDown } from 'react-icons/fa'
import { FaBars,FaTimes, } from 'react-icons/fa'
import { apiConnector } from '../services/apiconnector'
import {categories} from '../services/apis'
import { GiBookAura } from "react-icons/gi";
import { toast } from 'react-toastify'

const Navbar =() =>{
   const  {token} = useSelector((state)=>state.auth);
   const {user}= useSelector((state)=>state.profile);
   const {totalItem} = useSelector((state)=>state.cart);
 const dispatch = useDispatch();
 const {setCourse} = useSelector((state)=>state.course);
    const location=useLocation();
    const matchroute = (route) => location.pathname === route;
 
    const [sublinkss,setsubLinks] = useState([]);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setloading] = useState(true);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true); // Change background when scrolled down
      } else {
        setIsScrolled(false); // Original background when scrolled up
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll); // Cleanup
      };
    }, []);

    const fetchsublinks = async()=>{
           try{
            setloading(true);
              const result =await apiConnector("GET",categories.CATEGORIES_API);
              console.log("result ",result);
              setsubLinks(result.data.getallcategory);
              dispatch(setCourse(result.data.getallcategory));
           }catch(error){
              console.log("could not fetch the catlog data ");
           }
           setloading(false);
    }

    useEffect(() => {
        fetchsublinks();
    }, [])
    
  // make nav responsiveness

    const  toggleSidebar =()=>{
      setIsSidebarOpen(!isSidebarOpen);
    }



  return (
    <div className={`fixed z-50 ${isScrolled ? 'bg-slate-800' : 'bg-slate-950'} w-full flex justify-evenly items-center p-4 border-b-2 border-blue-400`}>
      <Link to={'./'} className="text-xl font-bold text-white">
      <div className='flex gap-1'>
        <GiBookAura className='mt-1 text-yellow-400'/>
        <p>  Edtech Perception</p>
      </div>
      
      </Link>
      <div className="md:hidden">
        <button onClick={toggleSidebar}>
          {isSidebarOpen ? <FaTimes className="text-white" /> :
          <div className='flex'>
           <FaBars className="text-white" /> 
           <p className='text-white mt-[-5px]'>Menu</p>
          </div>
          
          }
        </button>
      </div>
      <nav className="hidden md:flex gap-6">
        <ul className="flex gap-6">
          {
          navbarlink.map((link, index) => (
            <li key={index}>
              {link.title === 'Catlog' ? (
          
              <span className="group cursor-pointer relative">
                <div className='flex gap-2 text-white'>
                   {link.title}
                <FaArrowAltCircleDown className='mt-1' />
                </div>
               
          
                {/* Dropdown Menu */}
                
                <div className="absolute left-0  bg-slate-300 rounded-lg p-4
                 text-rose-700 opacity-0 group-hover:opacity-100
                  invisible group-hover:visible transition-opacity
                   duration-200 shadow-lg z-10">
                    {
                      loading ? (<div className='flex gap-2'>
                        <div class="loader size-12"></div>
                        <div className='mt-2'>Loading....</div>
                      </div>) : (<div>
                   {sublinkss.length > 0 ? (
                    sublinkss.map((sublink, subIndex) => (
                      <div key={subIndex} className="hover:bg-amber-500 p-2 rounded-md">
                        <Link to={`/catalog/${sublink.name}`}>{sublink.name}</Link>
                      </div>
                    ))
                  ) : (
                    <p>No links available</p>
                  )}
                      </div>)
                    }


                </div>
              </span>
            
        
              ) : (
                <Link to={link.path}>
                  <p className={location.pathname === link.path ? 'text-orange-600' : 'text-white'}>{link.title}</p>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="hidden md:flex items-center">
        {user?.accounttype === 'student' && (
          <Link to="/dashboard/cart" className="relative mx-3 text-white">
            <FaCartArrowDown />
            {totalItem > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-sm">{totalItem}</span>}
          </Link>
        )}
        {!token && (
          <>
            <Link to="/login" className="mx-3 text-white">Login</Link>
            <Link to="/signup" className='text-white'>Signup</Link>
          </>
        )}
        {token && <Profiledropdown />}
      </div>

      {/* Sidebar for small screens */}
      {isSidebarOpen && (
        <div className="fixed right-0   
         top-0 w-64 h-full bg-slate-900 text-white p-4 z-50 shadow-lg">
          <button className="mb-4" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <ul className="space-y-4">
            {navbarlink.map((link, index) => (
              <li key={index}  >
              {link.title === 'Catlog' ? (
                <div className="relative group cursor-pointer">
                  <div className="flex gap-2 text-white">
                    {link.title} <FaArrowAltCircleDown className='mt-1'/>
                  </div>
                  <div className=" bg-slate-300 rounded-lg p-4
                   text-rose-700 opacity-0 transition-all duration-200 group-hover:opacity-100">
                    {sublinkss.length > 0 ? (
                      sublinkss.map((sublink, subIndex) => (
                        <div key={subIndex} onClick={toggleSidebar} className="hover:bg-amber-500 p-2 rounded-md">
                          <Link to={`/catalog/${sublink.name}`}>{sublink.name}</Link>
                        </div>
                      ))
                    ) : (
                      <p>No links available</p>
                    )}
                  </div>
                </div>
              ) : (
                <Link to={link.path}  onClick={toggleSidebar} >
                  {link.title}
                </Link>)}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            {!token ? (
              <>
                <Link to="/login" onClick={toggleSidebar}>Login</Link>
                <Link to="/signup" onClick={toggleSidebar} className="ml-4">Signup</Link>
              </>
            ) : ( <div className='scale-75'> <Profiledropdown  /></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar
