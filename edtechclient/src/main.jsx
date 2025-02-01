import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import rootreducers from './reducer/index.js'
import { configureStore } from '@reduxjs/toolkit'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
 
const store = configureStore({
  reducer:rootreducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
        // Ignore non-serializable values in these paths
        ignoredActions: ["course/setCourse"],
        ignoredPaths: ["course.course.headers"],
    },
}).concat(),
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
       <BrowserRouter>
       < ToastContainer/>
          <App />
    </BrowserRouter>
    </Provider>
   
    
  </StrictMode>,
)
