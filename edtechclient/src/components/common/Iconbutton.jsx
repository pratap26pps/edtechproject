import React from 'react'

const Iconbutton = ({ text,onClick,dissabled,children,outline=false,type}) => {

  return (
    <div>
        <button disabled={dissabled} onClick={onClick} type={type}>
       {
        children ?(
            <div>
                <span>{text}</span>
                    {children} 
            </div>
           
        ):(text)
     }
        </button>
     
    </div>
  )
}

export default Iconbutton


 
