import React from 'react'
import { NavLink, useLocation} from 'react-router-dom'

const Sidebarlink = ({link}) => {

     const location = useLocation();
     const matchroute = (route) => location.pathname === route;
 
    
  return (
    <div className='my-2'>
     
    <NavLink
      to={link.path}
      className={() => 
        `${matchroute(link.path) ?
       "bg-yellow-500  p-2 border-l-8 border-green-500 " : 
       "hover:bg-yellow-500 p-2  bg-opacity-0"}`
      }
    >  
          <span>{link.name}</span> 

        </NavLink>      
    </div>
  )
}

export default Sidebarlink
