import { RxCross1 } from 'react-icons/rx';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../slices/courseSlice';
import { createsubsectionapi, updatesubsection } from '../../services/opration/coursedetailsapi';

const Subsectionmodal = ({ modalData, view = false, edit = false, add = false, setmodaldata }) => {
  const { register, setValue, handleSubmit, formState: { errors }, getValues, trigger } = useForm();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [preview, setPreview] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if ((view || edit) && modalData) {
      setValue('lecturetitle', modalData.title);
      setValue('lecturedescription', modalData.description);
      setValue('lectureduration', modalData.timeduration);
      if (modalData.video) {
        setPreview(modalData.video);
      }
    }
  }, [modalData, view, edit, setValue]);

  const isformupdate = () => {
    const currentvalues = getValues();
    return (
      currentvalues.lecturetitle !== modalData.title ||
      currentvalues.lecturedescription !== modalData.description ||
      currentvalues.lectureduration !== modalData.timeduration ||
      currentvalues.lecturevideo !== modalData.video
    );
  };

  const handleeditsubsectionit = async () => {
    const currentvalues = getValues();
    const formdata = new FormData();
    formdata.append("sectionid", modalData.sectionid);
    formdata.append("subsectionid", modalData._id);

    if (currentvalues.lecturetitle !== modalData.title) {
      formdata.append("title", currentvalues.lecturetitle);
    }
    if (currentvalues.lecturedescription !== modalData.description) {
      formdata.append("description", currentvalues.lecturedescription);
    }
    if (currentvalues.lectureduration !== modalData.timeduration) {
      formdata.append("timeduration", currentvalues.lectureduration);
    }
    if (
      currentvalues.lecturevideo &&
      currentvalues.lecturevideo.length > 0 &&
      currentvalues.lecturevideo !== modalData.video
    ) {
      formdata.append("video", currentvalues.lecturevideo[0]);
    }

    setloading(true);
    const result = await updatesubsection(formdata, token);
    if (result) {
      dispatch(setCourse(result));
    }
    setmodaldata(null);
    setloading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      if (!isformupdate()) {
        toast.error("No changes made to the form");
      } else {
        handleeditsubsectionit();
      }
      return;
    }

    const formdata = new FormData();
    formdata.append("sectionid", modalData.sectionid);
    formdata.append("title", data.lecturetitle);
    formdata.append("description", data.lecturedescription);
    formdata.append("timeduration", data.lectureduration);

    if (data.lecturevideo && data.lecturevideo[0]) {
      formdata.append("video", data.lecturevideo[0]);
    } else {
      toast.error("Please upload a valid video file");
      return;
    }

    setloading(true);
    const response = await createsubsectionapi(formdata, token);
    if (response) {
      dispatch(setCourse(response.data.updatesection));
    }
    setmodaldata(null);
    setloading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("lecturevideo", e.target.files, { shouldValidate: true });  
      trigger("lecturevideo");  
    }
  };

  return (
    <div>
      <div className='flex justify-between'>
        <p>{view && "Viewing"}{edit && "Editing"}{add && "Adding"} Lecture</p>
        <button onClick={() => (!loading ? setmodaldata(null) : {})}>
          <RxCross1 />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* VIDEO FIELD */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Lecture Video</label>
          <input
            type="file"
            id="lecturevideo"
            accept="video/mp4, video/mov, video/avi"
            {...register("lecturevideo", { required: !edit })}  
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.lecturevideo && (
            <span className="text-red-500 text-sm mt-1">Please upload video</span>
          )}

          {/* Video Preview */}
          {preview && (
            <div className="mt-4">
              <p className="text-gray-700 font-medium mb-2">Video Preview:</p>
              <video controls src={preview} className="w-full h-auto border rounded" />
            </div>
          )}
        </div>

        {/* TITLE */}
        <div>
          <label>Lecture Title</label>
          <input
            placeholder='Enter lecture title'
            id='lecturetitle'
            {...register("lecturetitle", { required: true })}
            className='w-full text-black p-1 rounded-md'
          />
          {errors.lecturetitle && (<span className='text-red-500 text-sm'>Lecture title is required</span>)}
        </div>

        {/* DURATION */}
        <div>
          <label>Lecture Time Duration</label>
          <input
            type='number'
            placeholder='Enter lecture time duration'
            id='lectureduration'
            {...register("lectureduration", { required: true })}
            className='w-full text-black p-1 rounded-md'
          />
          {errors.lectureduration && (<span className='text-red-500 text-sm'>Lecture time duration is required</span>)}
        </div>

        {/* DESCRIPTION */}
        <div>
          <label>Lecture Description</label>
          <textarea
            placeholder='Enter lecture description'
            id='lecturedescription'
            {...register("lecturedescription", { required: true })}
            className='w-full min-h-[130px] text-black p-1 rounded-md'
          />
          {errors.lecturedescription && (<span className='text-red-500 text-sm'>Lecture description is required</span>)}
        </div>

        {/* BUTTON */}
        {
          !view && (
            <div className="mt-4">
              <button
                type="submit"
                disabled={loading}
                className='bg-red-400 p-2 rounded-xl hover:scale-95 hover:bg-green-400 transition-all duration-150'
              >
                {loading ? "Loading..." : edit ? "Save Changes" : "Save"}
              </button>
            </div>
          )
        }
      </form>
    </div>
  );
};

export default Subsectionmodal;
