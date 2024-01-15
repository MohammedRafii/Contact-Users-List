import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layouts, { CreateUser, DeleteUser, EditUser, Home, Users, ViewUser } from "./components";
import axios from "axios";
import { ErrorBound } from "./components/Error/ErrorBoundry";

axios.defaults.baseURL = 'https://restapiusers.vercel.app'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="Contact-Users-List/" element={<Layouts />}>
      <Route path="" element={<Home />}/>
      <Route path="users" element={<Users />} loader={Users.loader} ErrorBoundary={ErrorBound} >
        <Route path="create" element={<CreateUser />} action={CreateUser.action} ErrorBoundary={ErrorBound}/>
        <Route path=":id/view" element={<ViewUser />} loader={ViewUser.loader} ErrorBoundary={ErrorBound} />
        <Route path=":id/edit" element={<EditUser />} loader={EditUser.loader} action={EditUser.action} ErrorBoundary={ErrorBound} />
        <Route path=":id/delete" element={<DeleteUser />} action={DeleteUser.action} ErrorBoundary={ErrorBound}  />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
