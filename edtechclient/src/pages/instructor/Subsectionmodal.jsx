 
import { RxCross1 } from 'react-icons/rx';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../slices/courseSlice';
import { createsubsectionapi } from '../../services/opration/coursedetailsapi';
 
const Subsectionmodal = ({ modalData ,view=false,edit=false,add=false,setmodaldata}) => {
  console.log("modaldata",modalData );
  const {register,setValue,handleSubmit,  formState:{errors},getValues} = useForm();
  const dispatch = useDispatch();
  const [loading,setloading] = useState(false)
 
  const {token} = useSelector((state)=>state.auth);

  useEffect(() => {
    if ((view || edit) && modalData) {
      setValue('lecturetitle', modalData.title);
      setValue('lecturedescription', modalData.description);
      setValue('lecturetimeduration', modalData.timeduration);
      setValue('lecturevideo', modalData.video);
      if (modalData.video) {
        setPreview(modalData.video);
      }
    }
  }, [modalData, view, edit, setValue]);


  const isformupdate =()=>{
     const currentvalues = getValues();
     if(currentvalues.lecturetitle  !== modalData.title  ||
        currentvalues.lecturedescription  !== modalData.description ||
        currentvalues.lectureduration  !== modalData.timeduration  ||
        currentvalues.lecturevideo  !== modalData.video   
     ){
          return true;
     }
     else{
        return false;
     }
  }
  
   const handleeditsubsectionit =async ()=>{
      const currentvalues = getValues();
      const formdata = new FormData();
      formdata.append("sectionid",modalData.sectionid);
      formdata.append("subsectionid",modalData._id);

      if (currentvalues.lecturetitle !==modalData.title){
             formdata.append("title",currentvalues.lecturetitle)
      }
      if (currentvalues.lecturedescription !==modalData.description){
        formdata.append("description",currentvalues.lecturedescription)
     }
     if (currentvalues.lectureduration !==modalData.timedration){
      formdata.append("timeduration",currentvalues.lectureduration)
   }
     if (currentvalues.lecturevideo !==modalData.video){
    formdata.append("video",currentvalues.lecturevideo)
    }

    setloading(true);
    // api call
    const result = await updatesubsection(formdata,token);
    if(result){
        dispatch(setCourse(result));
    }
    setmodaldata(null);
    setloading(false);

   }

  const onSubmit =async (data)=>{
    if(view)  return;
    if(edit){
        if(!isformupdate){
        toast.error("no changes made to the form")
        }
        else handleeditsubsectionit()
        
        return
    }
    const formdata = new FormData();
    formdata.append("sectionid",modalData.sectionid );
    formdata.append("title",data.lecturetitle);
    formdata.append("description",data.lecturedescription);
    formdata.append("timeduration",data.lectureduration);
    formdata.append("video",data.lecturevideo[0]);
   setloading(true);
   console.log("formdata",[...formdata.entries()]);
    // api call
    const response = await  createsubsectionapi(formdata,token);
    if(response){
        dispatch(setCourse(response.data.updatesection))
        
    }
    setmodaldata(null);
    setloading(false);
  }

     const [preview, setPreview] = useState(null);
   
     useEffect(() => {
       if (edit) {
         setPreview(edit);
       } else if (view) {
         setPreview(view);
       }
     }, [edit, view]);
   
     const handleFileChange = (e) => {
       const file = e.target.files[0];
       if (file) {
         setPreview(URL.createObjectURL(file));
         setValue("video", file, { shouldValidate: true }); // Update form value
       }
     };



  return (
    <div>
        <div className='flex justify-between'>
          <p>{view && "viewing"}{edit &&"edit"} {add && "Add"} leacture</p>
          <button onClick={()=>(!loading ? setmodaldata(null):{})}>
          <RxCross1/>
          </button>
        </div>     
        <form onSubmit={handleSubmit(onSubmit)}>


        <div className="mb-4">
      <label   className="block font-medium mb-2">lecture video   </label>
           <input
            type="file"
            id="lecturevideo"
            accept="video/mp4, video/mov, video/avi"
            {...register("lecturevideo", {  required: true})}
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.lecturevideo && (
            <span className="text-red-500 text-sm mt-1">
                please upload video
            </span>
          )}


      {/* Preview Section */}
      {preview && (
        <div className="mt-4">
          <p className="text-gray-700 font-medium mb-2">Video Preview:</p>
          <video controls src={preview} className="w-full h-auto border rounded" />
        </div>
      )}
 
    </div>




               <div>
                <label>Lecture Title</label>
                <input 
                placeholder='enter lecture title'
                id='lecturetitle'
                {...register("lecturetitle",{required:true})}
                className='w-full text-black p-1 rounded-md'
                />
                {
                    errors.lecturetitle  &&(<span>lecture title is required</span>)
                }
               </div>
               <div>
                <label>Lecture timeduration</label>
                <input  type='number'
                placeholder='enter lecture time duration'
                id='lectureduration'
                {...register("lectureduration",{required:true})}
                className='w-full text-black p-1 rounded-md'
                />
                {
                    errors.lectureduration  &&(<span>lecture timeduration is required</span>)
                }
               </div>
               <div>
                <label >Lecture description</label>
                <textarea 
                placeholder='enter lecture description'
                id='lecturedescription'
                {...register("lecturedescription",{required:true})}
                className='w-full min-h-[130px] text-black p-1 rounded-md'
                />
                {
                    errors.lecturetitle  &&(<span>lecture description is required</span>)
                }
               </div>

            {
                !view && (
                    <div>
                        <button  className='bg-red-400 p-2 rounded-xl hover:scale-95 hover:bg-green-400
                        transition-all duration-150'>
                        {loading ?"loading":edit ?"shaves changes":"Save"}    
                        </button>
                    </div>
                )
             }

            </form> 
    </div>
  )
}

export default Subsectionmodal
