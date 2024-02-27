import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layouts, { Login, Intro, Register, User, CreateUser, ViewUser, EditUser, DeleteUser, Profile } from "./components";
import { ErrorBound } from "./components/Error/ErrorBoundry";
import { useContext, useEffect } from "react";
import { Context } from "./main";
import axios from "axios";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layouts />}  >
      <Route path="" element={<Intro />} />
      <Route path="register" element={<Register />} ErrorBoundary={ErrorBound} />
      <Route path="profile" element={<Profile />} ErrorBoundary={ErrorBound} />
      <Route path="contacts" element={<User />} ErrorBoundary={ErrorBound}>
        <Route path="create" element={<CreateUser />} action={CreateUser.action} ErrorBoundary={ErrorBound} />
        <Route path=":id/view" element={<ViewUser />} loader={ViewUser.loader} ErrorBoundary={ErrorBound} />
        <Route path=":id/edit" element={<EditUser />} loader={EditUser.loader} action={EditUser.action} ErrorBoundary={ErrorBound} />
        <Route path=":id/delete" element={<DeleteUser />} action={DeleteUser.action} ErrorBoundary={ErrorBound} />
      </Route>
      <Route path="login" element={<Login />} ErrorBoundary={ErrorBound} />
    </Route>
  )
)
const App = () => {
  const { setIsAuthenticated, isAuthenticated, setLoading, setUser } = useContext(Context)
  useEffect(() => {
    setLoading(true)
    axios.get('/user/me', { withCredentials: true })
      .then((res) => {
        setUser(res.data.user)
        setIsAuthenticated(true)
        setLoading(false)
      }).catch(_err => {
        setUser({})
        setIsAuthenticated(false)
        setLoading(false)
      })
  }, [isAuthenticated])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
