 
import './App.css'
import { Routes,Route } from 'react-router-dom'
 import Home from './pages/Home'
 import Aboutus from './pages/Aboutus'
 import Login from './pages/Login'
 import Signup from './pages/Signup'
 import Navbar from './pages/Navbar'
 import Contact from './pages/Contact'
 import Updatepassword from './pages/Updatepassword'
  import Forgotpassword from './pages/Forgotpassword'
 import OtpPage from './pages/OtpPage'
import Dashboard from './components/cores/Dashboard'
import Myprofile from './pages/Dashboard/Myprofile'
import Privateroute from './components/common/Privateroute'
import Error from './components/common/Error'
import EnrolledCourse from './pages/Dashboard/EnrolledCourse'
import Setting from './pages/Dashboard/Setting'
import Cart from './pages/Dashboard/Cart'
import { ACCOUNT_TYPE } from './components/common/Utilsconst'
import { useSelector } from 'react-redux'
import Addcategory from './pages/admin/Addcategory'
import Allcategory from './pages/admin/Allcategory' 
import Mycourseinst from './pages/instructor/Mycourseinst'
import Addcourses from './pages/instructor/Addcourses'
import Dashboardinst from './pages/instructor/Dashboard'
import Buynow from './pages/Catalog/Buynow' 
import Catalog from './pages/Catalog/Catalog'
function App() {
   const user = useSelector((state)=>state.profile);
   
 
  return (
    <div className='w-screen overflow-x-hidden  min-h-screen bg-slate-950 flex flex-col '>
      
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/aboutus" element={<Aboutus/>}/>
      <Route path="/contactus" element={<Contact/>}/>
      <Route path="/catalog/:catalogName" element={<Catalog/>}/>
      <Route path="/catalog/buy/:courseid" element={<Buynow/>}/>

      <Route path="/dashboard" 
      element={
        <Privateroute>
           <Dashboard/>
        </Privateroute>}>
        <Route path="/dashboard/myprofle" element={ <Myprofile/> }/>
        <Route path="/dashboard/setting" element={ <Setting/> }/>
       {
        user && ACCOUNT_TYPE.stuent   &&(
          <>
          <Route path="/dashboard/cart" element={ <Cart/> }/>
        
          <Route path="/dashboard/enrolledcourse" element={ <EnrolledCourse/> }/>
          
          </>
        )
       }
              {
        user && ACCOUNT_TYPE.admin   &&(
          <>
          <Route path="/dashboard/addcategory" element={ <Addcategory/> }/>
        
          <Route path="/dashboard/allcategory" element={ <Allcategory/> }/>
          
          </>
        )
       }

       {
        user && ACCOUNT_TYPE.instructor  &&(
          <>
          
          <Route path="/dashboard/add-Course" element={ <Addcourses/> }/>
          <Route path="/dashboard/instructor" element={ <Dashboardinst/> }/>
          <Route path="/dashboard/my-course" element={ <Mycourseinst/> }/>
          </>
        )
       }
      </Route>
      <Route path="/otpPage" element={<OtpPage/>}/>
      <Route path="/forgotpassword" element={<Forgotpassword/>}/>

      <Route path="/profile/resetpassword/:id" element={<Updatepassword/>}/>
      
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="*" element={<Error/>}/>
       
    </Routes>
    </div>
  )
}

export default App
