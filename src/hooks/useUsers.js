import { useReducer, useState } from "react"
import { usersReducer } from "../reducers/usersReducer"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const initialUsers = [
    {
        id: 1,
        username: "admin",
        password: "predeterminado",
        email: "admin@correo.com"
    }
]

const initialUsersForm = {
    id: 0,
    username: "",
    password: "",
    email: "",
}


export const useUsers = () => {

    const [users, dispatch] = useReducer(usersReducer, initialUsers)
    const [userSelect, setUserSelect] = useState(initialUsersForm)
    const [visibleForm, setVisibleForm] = useState(false)
    const navigate = useNavigate()

    const handlerAddUser = (user) => {
        dispatch({
            type: (user.id === 0) ? "addUser" : "updateUser",
            payload: user
        })

        Swal.fire(
            user.id === 0 ? 'Usuario creado!' : 'Usuario editado',
            user.id === 0 ? 'El usuario <b>' + user.username + '</b> se ha creado correctamente'
                : 'El usuario <b>' + user.username + '</b> se ha editado correctamente',
            'success'
        )
        setVisibleForm(false)
        setUserSelect(initialUsersForm)
        navigate("/users")
    }

    const handlerRemoveUser = (id) => {

        Swal.fire({
            title: '¿Desea eliminar el usuario?',
            text: "Esta accion no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: "removeUser",
                    payload: id
                })
                Swal.fire(
                    'Eliminado!',
                    'El usuario ha sido eliminado.',
                    'success'
                )
            }
        })
        
    }

    const handlerSelectUser = (user) => {
        setVisibleForm(true)
        setUserSelect({ ...user })
    }

    return {
        users,
        userSelect,
        initialUsersForm,
        visibleForm,
        setVisibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerSelectUser
    }
}