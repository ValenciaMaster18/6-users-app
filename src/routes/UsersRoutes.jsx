import { Navigate, Route, Routes } from "react-router-dom"
import { UsersPage } from "../pages/UsersPage"
import { NavBar } from "../components/layout/NavBar"
import { RegisterPage } from "../pages/RegisterPage"
import { UserProvider } from "../context/UserProvider"


export const UsersRoutes = ({ handlerLogout, login }) => {

    return (
        <>
            <UserProvider>
                <NavBar handlerLogout={handlerLogout} login={login} />
                <Routes>
                    <Route path="users" element={<UsersPage/>} />
                    <Route path="users/register" element={<RegisterPage/>} />
                    <Route path="/*" element={<Navigate to={"/users"} />} />
                </Routes>
            </UserProvider>
        </>
    )
}