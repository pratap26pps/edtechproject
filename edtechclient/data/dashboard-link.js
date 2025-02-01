import { ImProfile } from "react-icons/im";
import { FaGraduationCap } from "react-icons/fa6"
import { SiBigcartel } from "react-icons/si";
import {ACCOUNT_TYPE} from '../src/components/common/Utilsconst'

export const sidebarlinks=[
  
    {
        id:1,
        name:"My-Profile",
        path:"/dashboard/myprofle",
        type:ACCOUNT_TYPE.instructor,
        icon:ImProfile
       
    },
      {
        id:2,
        name:"Dashboard",
        path:"/dashboard/instructor",
        type:ACCOUNT_TYPE.instructor,
        icon:ImProfile
       
    },
    {
        id:3,
        name:"My-Course",
        path:"/dashboard/my-course",
        type:ACCOUNT_TYPE.instructor,
        icon:"VscAccount"
       
    },
    {
        id:4,
        name:"Add-Course",
        path:"/dashboard/Add-Course",
        type:ACCOUNT_TYPE.instructor,
        icon:"VscAccount"
       
    },
    {
        id:5,
        name:"My-Profile",
        path:"/dashboard/myprofle",
        type:ACCOUNT_TYPE.stuent,
        icon:ImProfile
       
    },
    {
        id:6,
        name:"enrolled-course",
        path:"/dashboard/enrolledcourse",
        type:ACCOUNT_TYPE.stuent,
        icon:FaGraduationCap
       
    },
    {
        id:7,
        name:"wishlist",
        path:"/dashboard/cart",
        type:ACCOUNT_TYPE.stuent,
        icon:FaGraduationCap
       
    },
    {
        id:8,
        name:"My-profile",
        path:"/dashboard/myprofle",
        type:ACCOUNT_TYPE.admin,
        icon:FaGraduationCap
       
    },
  
    {
        id:9,
        name:"Add-category",
        path:"/dashboard/addcategory",
        type:ACCOUNT_TYPE.admin,
        icon:FaGraduationCap
       
    },
    {
        id:10,
        name:"All-category",
        path:"/dashboard/allcategory",
        type:ACCOUNT_TYPE.admin,
        icon:FaGraduationCap
       
    },
 
]