import { useReducer } from "react"
import { loginReducer } from "../reducers/loginReducer"
import Swal from "sweetalert2"
import { loginService } from "../services/authService"
import { useNavigate } from "react-router-dom"

const initialLogin = JSON.parse(sessionStorage.getItem("login")) || {
    isAuth: false,
    user: undefined
}


export const useAuth = () => {

    const [login, dispath] = useReducer(loginReducer, initialLogin)
    const navigate = useNavigate()

    const handlerLogin = ({ username, password }) => {
        const isLogin = loginService({ username, password })
        if (isLogin) {
            const user = { username: "admin" }
            dispath({
                type: "login",
                payload: user
            })
            sessionStorage.setItem("login", JSON.stringify({
                isAuth: true,
                user
            }))
            navigate("/users")
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Username o Password incorrecto!',
            })
            return
        }
    }

    const handlerLogout = () => {
        dispath({
            type: "logout"
        })
        sessionStorage.removeItem("login")
        navigate("/login")
    }

    return {
        handlerLogout,
        handlerLogin,
        login,
    }
}