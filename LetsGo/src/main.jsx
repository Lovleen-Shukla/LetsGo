import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-Trip'
import Header from './componets/custom/header'
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId]/index'
const router=createBrowserRouter([
  {
  path:'/',
  element:<App/>
},
{
  path: '/create-trip',  // Use lowercase to match Link
  element: <CreateTrip />
},
{
  path:'/view-trip/:tripId',
  element:<Viewtrip/>
}

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <Toaster />
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>  
  </StrictMode>,
)
