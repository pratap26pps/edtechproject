import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from 'react-icons/rx';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { BiArrowFromTop } from 'react-icons/bi';
import Modaal from '../../components/common/Modaal'
import {setCourse} from '../../slices/courseSlice'
import Subsectionmodal from './Subsectionmodal';
const Creaatesection = ({handleeditsectionname}) => {

    const {course}= useSelector((state)=>state.course);
    const {token}= useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const [addsubsection,setaddsubsection] = useState(null);
    const [viewsubsection,setviewsubsection] = useState(null);
    const [editsubsection,seteditsubsection] = useState(null);
    const [confirmationalmaodal,setconfirmationalmaodal] = useState(null);

    const handledeletesection =async (sectionid)=>{
    // delete section api call
    try{
      const response = await deletemysection({
        sectionid,
        courseid:course._id,
        token
      });
      if(response){
        dispatch(setCourse(result));
      }
      setconfirmationalmaodal(null);
    }catch(error){
         console.log(error);
    }
    }
    const handledeletesubsection = async(subsectionid,sectionid)=>{
      try{
        const response = await deletemysubsection({
          subsectionid,sectionid,token
        });
        if(response){
          dispatch(setCourse(response));
        }
        setconfirmationalmaodal(null);
      }catch(error){
           console.log(error);

      }

    }
  return (
    <div>
      <div className='bg-slate-600 p-3 rounded-md'>
        {course?.coursecontent?.map((section)=>(
          <details 
          key={section._id} open
          >
             <summary className='flex  border-b-2 mt-4'>
               <div className='flex justify-between my-2 gap-x-4'>
                <div className='flex gap-2 lg:text-3xl '>
                   <RxDropdownMenu  className='mt-1 '/>
                <p>{section.sectionName}</p>
                
                </div>
               
               <div className='flex ml-20 gap-2'>
               <button onClick={()=>handleeditsectionname(section.sectionName,section._id)}>
                  <MdEdit/>
               </button>
               <button onClick={()=>{
                setconfirmationalmaodal({
                    text1:"Delete this Section",
                    text2:"all the lecture in this section will be deleted",
                    btn1text:"Delete",
                    btn2text:"Cancel",
                    btn1handler:()=>{handledeletesection(section._id)},
                    btn2handler:()=>setconfirmationalmaodal(null),
                })
               }}>
                  <RiDeleteBack2Fill />
               </button>
                 <span>|</span>
                <button>
                    <BiArrowFromTop/>
                </button>
               </div>
              
             </div>
             </summary>

             {/* create subsection */}

             <div>
                {
                    section.subsection?.map((data)=>(
                        <div key={data._id}
                        onClick={()=>setviewsubsection(data)}
                        className='flex items-center justify-between gap-x-3 botder-b-2'
                        >
              <div className='flex'>
                <RxDropdownMenu />
                <p>{data.title}</p>
              </div>
              <div className='flex '
              onClick={(e)=>e.stopPropagation()}
              >

               <button onClick={()=>seteditsubsection({...data,sectionid:section._id})}>
                  <MdEdit/>
               </button>
               <button onClick={()=>{
                 setconfirmationalmaodal({
                    text1:"Delete this sub Section",
                    text2:"selected lecture in sub section will be deleted",
                    btn1text:"Delete",
                    btn2text:"Cancel",
                    btn1handler:()=>{handledeletesubsection(data._id,section._id)},
                    btn2handler:()=>setconfirmationalmaodal(null),
                })
               }}>
                  <RiDeleteBack2Fill />
               </button>
                 <span>|</span>
                <button>
                    <BiArrowFromTop/>
                </button>
                </div>
                        </div>
                    ))
                }
               
                <button className='flex gap-2 text-yellow-400 my-3' 
                onClick={()=>setaddsubsection({ sectionid: section._id,timeduration:'',
                  title: '', description: '', video: null})}>
                  <AiOutlinePlus/><p>Add Lecture</p>
                </button>    
             </div> 
          </details>
        ))}
      </div>
   {/*  */}
   {
    addsubsection ?(<Subsectionmodal modalData ={addsubsection}
       setmodaldata = {setaddsubsection} add ={true}/> ):
     viewsubsection ?(<Subsectionmodal  modalData = {viewsubsection}  
     setmodaldata={setviewsubsection} view={true} />):
     editsubsection ?(<Subsectionmodal  modalData={editsubsection}
     setmodaldata={seteditsubsection} edit={true}/>):
     (<div></div>)
   }
   {
    confirmationalmaodal ?(<Modaal modaldata={confirmationalmaodal}/>):(<div></div>)
   }

      
    </div>
  )
}

export default Creaatesection
