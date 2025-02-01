import React from 'react'
import { Link } from 'react-router-dom'
const Ctabutton = ({children,active,linkto}) => {
  return (
    <Link to={linkto}>
       <div className={ `transition-all
       p-2 mx-5 duration-100 hover:scale-95 cursor-pointer rounded-lg 
        ${active ? "bg-yellow-400" : "bg-slate-600" }`}>
      {children}
       </div>  
    </Link>
   
  )
}
export default Ctabutton