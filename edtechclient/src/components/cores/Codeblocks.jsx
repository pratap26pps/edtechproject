 import React from 'react'
 import { TypeAnimation } from 'react-type-animation'

 
  const Codeblocks = ({
    position, heading,subheading,codeblock ,button ,codecolor
  }) => {
   return (
     <div className={`lg:flex lg:flex-row sm:flex-col ${position} my-10 p-4 justify-between gap-8`}>
        {/* section1 */}
        <div className='flex flex-col gap-10  '>
         {heading}
         <div className='font-bold text-gray-800'>
            {subheading}
         </div>
         <div className='flex '>
              {button}
      </div>

        </div>
         {/* section 2 */}
         <div className='h-fit flex flex-row mr-6 w-[100%] lg:w-[500px]'>
            <div className='text-center flex flex-col w-[10%] font-bold text-stone-900'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            </div>
            <div className={`flex flex-col text-yellow-700 w-[90%] font-bold ${codecolor}`}>
                <TypeAnimation  sequence={[codeblock,2000]}
                repeat={Infinity}
             omitDeletionAnimation={true}
                style={
                  {whiteSpace:"pre-line",
                    display:"block"
                  }
                }
                />
            </div>
            </div>
           
            
     </div>
   )
 }

 export default Codeblocks
 