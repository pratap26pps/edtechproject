// ink mentions
// add all endpoints (like controllers )

const BASE_URL = import.meta.env.VITE_BASE_URL
console.log("base_url",BASE_URL);



export const categories ={
    CATEGORIES_API: `${BASE_URL}/courses/showallcategory`,
};

export const userotp ={
    USEROTP_API: `${BASE_URL}/auth/sendotp`,
};

export const signupapi = {
    signup_api:  `${BASE_URL}/auth/signup`,
}
export const loginapi = {
    login_api:  `${BASE_URL}/auth/login`,
}

export const resetpasswordapi = {
    RESETPASSWORD_API:  `${BASE_URL}/profile/resetpasstoken`,
}
export const resetpasswordupdate = {
    RESETPASSWORDUPDATE_API:  `${BASE_URL}/profile/resetpassword`,
}
export const getcoursesection = {
    GETMYCOURSES_API:  `${BASE_URL}/profile/getenrolledcourses`,
}
export const getcreatecourse = {
    GETCREATECOURSE_API:  `${BASE_URL}/courses/createcourse`,
}
export const geteditcreatecourse = {
    GETEDITCREATECOURSE_API:  `${BASE_URL}/courses/editcreatecourse`,
}

// section creation
export const getcreatesectioncourse = {
    GETCREATESECTIONCOURSE_API:  `${BASE_URL}/courses/createsection`,
}
export const createsubsectioncourse = {
    CREATESUBSECTIONCOURSE_API:  `${BASE_URL}/courses/subsectioncreation`,
}
export const showallcoursedetails = {
    SHOWALLCOURSE_API:  `${BASE_URL}/courses/showallcourse`,
}
export const showcoursedetails = {
    SHOWCOURSEDETAILS_API:  `${BASE_URL}/courses/showcoursedetails`,
}
export const updatecreatesectioncourse = {
    UPDATECREATESECTIONCOURSE_API:  `${BASE_URL}/courses/updatesection`,
}
export const deletemyaccount = {
    DELETEACCOUNT_API:  `${BASE_URL}/profile/deleteaccount`,
}

export const apicatalogdata = {
    CATALOG_API:  `${BASE_URL}/courses/pagedetails`,
}
export const apiaddcoursetocat = {
    ADCATCOURSE_API:  `${BASE_URL}/courses/addCourseToCategory`,
}


export const  addcreatecategory = {
    CATEGORYADD_API:  `${BASE_URL}/courses/createcategory`,
}
export const  fetchallcat = {
    FETCHALLCAT_API:  `${BASE_URL}/courses/showallcategory`,
}