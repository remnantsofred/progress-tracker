import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as ReactDOM from 'react-dom/client'
import ErrorPage from './error-page.jsx';
import React from 'react'
import Root from './routes/root.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    // children: [
    //   {
    //     path: "milestones",
    //     element: <MilestonesPage />,
    //   },
    //   {
    //     path: "milestones/new",
    //     element: <MilestoneForm />,
    //   }
  
    // ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} >
    </RouterProvider>
  </React.StrictMode>,
)



