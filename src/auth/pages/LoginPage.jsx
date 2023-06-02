import { useState } from "react"
import Swal from "sweetalert2"

const initialLoginFormData = {
    username: "",
    password: ""
}

export const LoginPage = ({handlerLogin, handlerLogout}) => {
    const [loginForm, setLoginForm] = useState(initialLoginFormData)
    const {username, password} = loginForm

    const onInputChange = ({target}) => {
        const {name, value} = target
        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault()
        if (!username || !password){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hay campos vacios o incorrectos!',
            })
            return
        }

        handlerLogin({username, password})
        setLoginForm(initialLoginFormData)
    }

    return (
        <div className="modal" style={{ display: "block" }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Iniciar Sesion</h5>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="modal-body">
                            <input type="text" className="form-control my-3 w-75"
                                placeholder="Username"
                                value={username}
                                name="username"
                                onChange={onInputChange}
                            />
                            <input type="password" className="form-control my-3 w-75"
                                placeholder="Password"
                                value={password}
                                name="password"
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Entrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}