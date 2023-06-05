import { useReducer } from "react"
import { loginReducer } from "../reducers/loginReducer"
import Swal from "sweetalert2"
import { loginService } from "../services/authService"
import { useNavigate } from "react-router-dom"

const initialLogin = JSON.parse(sessionStorage.getItem("login")) || {
    isAuth: false,
    isAdmin: false,
    user: undefined
}

export const useAuth = () => {

    const [login, dispath] = useReducer(loginReducer, initialLogin)
    const navigate = useNavigate()

    const handlerLogin = async ({ username, password }) => {
        try {
            const response = await loginService({ username, password })
            const token = response.data.token
            const claims = JSON.parse(window.atob(token.split(".")[1]))
            const user = { username: response.data.username }
            dispath({
                type: "login",
                payload: { user, isAdmin: claims.isAdmin }
            })
            sessionStorage.setItem("login", JSON.stringify({
                isAuth: true,
                isAdmin: claims.isAdmin,
                user
            }))
            sessionStorage.setItem("token", `Bearer ${token}`)
            navigate("/users")
        } catch (error) {
            if (error.response?.status == 401){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Username o Password incorrecto!',
                })
            } else if (error.response?.status == 403){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No tiene permisos para acceder!',
                })
            } else {
                throw error
            }
            return
        }
    }

    const handlerLogout = () => {
        dispath({
            type: "logout"
        })
        // sessionStorage.removeItem("login")
        // sessionStorage.removeItem("token")
        sessionStorage.clear()
        navigate("/login")
    }

    return {
        handlerLogout,
        handlerLogin,
        login,
    }
}