import { useContext, useEffect, useState } from "react"
import Swal from "sweetalert2"
import { UserContext } from "../context/UserContext"

export const UsersForm = ({ userSelect, setVisibleForm }) => {
    const {handlerAddUser, initialUsersForm} = useContext(UserContext)

    const [userForm, setUserForm] = useState(initialUsersForm)

    const { id, username, password, email } = userForm

    useEffect(() => {
        setUserForm({
            ...userSelect,
            password: ""
        })
    }, [userSelect])

    const onInputChange = ({ target }) => {
        const { name, value } = target
        setUserForm({
            ...userForm,
            [name]: value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault()
        if (!username || (id == 0 && !password) || !email) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hay campos vacios o incorrectos!',
            })
            return
        }
        handlerAddUser(userForm)
        setUserForm(initialUsersForm)
    }
    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                className="form-control my-3 w-75"
                onChange={onInputChange}
            />
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                className="form-control my-3 w-75"
                onChange={onInputChange}
            />
            {id > 0 || <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                className="form-control my-3 w-75"
                onChange={onInputChange}
            />
            }

            <input type="hidden"
                name="id"
                value={id}
            />
            <button
                type="submit"
                className="btn btn-primary"
            >
                {id > 0 ? "Editar" : "Crear"}
            </button>
            {!setVisibleForm || <button
                className="btn btn-secondary mx-2"
                type="button"
                onClick={() => setVisibleForm(false)}
            >
                Cerrar
            </button>
            }
        </form>
    )
}