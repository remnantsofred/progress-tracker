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
import EditMilestoneModal from './components/EditMilestoneModal/EditMilestoneModal.jsx';
import MilestoneForm from './components/MilestoneForm/MilestoneForm.jsx';
import { MilestonesPage } from './components/MilestonesPage/MilestonesPage.jsx';
import PTPage from './components/PTPage/PTPage.jsx';
import PTForm from './components/PTForm/PTForm.jsx';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "milestones",
//         element: <MilestonesPage />,
//       },
//       {
//         path: "milestones/new",
//         element: <MilestoneForm />,
//       },
//       {
//         path: "pt-plans",
//         element: <PTPage />,
//       },
//       {
//         path: "pt-plans/new",
//         element: <PTForm />,
//       },
  
//     ]
//   }
// ]);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router} >
//     </RouterProvider>
//   </React.StrictMode>,
// )



