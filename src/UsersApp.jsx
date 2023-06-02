
import { LoginPage } from "./auth/pages/LoginPage"
import { useAuth } from "./auth/hooks/useAuth"
import { Navigate, Route, Routes } from "react-router-dom"
import { UsersRoutes } from "./routes/UsersRoutes"


export const UsersApp = () => {

    const { handlerLogout, login, handlerLogin } = useAuth()
    return (
        <Routes>

            {login.isAuth
                ? (
                    <Route path="/*" element={
                        <UsersRoutes
                            handlerLogout={handlerLogout}
                            login={login}
                        />} />
                )
                :
                <>
                    <Route path="/login" element={
                        <LoginPage
                            handlerLogin={handlerLogin}
                        />} />
                    <Route path="/*" element={<Navigate to={"/login"}/>}/>
                </>
            }

        </Routes>
    )
}