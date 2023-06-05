import { useReducer, useState } from "react"
import { usersReducer } from "../reducers/usersReducer"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { deleteUser, findAll, saveUser, updateUser } from "../services/userServices"

const initialUsers = []

const initialUsersForm = {
    id: 0,
    username: "",
    password: "",
    email: "",
}

const initialErrors = {
    username: "",
    password: "",
    email: "",
}
export const useUsers = () => {

    const [users, dispatch] = useReducer(usersReducer, initialUsers)
    const [userSelect, setUserSelect] = useState(initialUsersForm)
    const [visibleForm, setVisibleForm] = useState(false)

    const [errors, setError] = useState(initialErrors)

    const navigate = useNavigate()

    const getUsers = async () => {
        const result = await findAll()
        dispatch({
            type: "loadingUsers",
            payload: result
        })
    }

    const handlerAddUser = async (user) => {
        let response
        try {
            if (user.id === 0) {
                response = await saveUser(user)
            } else {
                response = await updateUser(user)
            }

            dispatch({
                type: (user.id === 0) ? "addUser" : "updateUser",
                payload: response.data
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
        } catch (error) {
            if(error.response && error.response.status == 400){
                setError(error.response.data)
            } else if (error.response && 
                error.response.status == 500 && 
                error.response.data?.message.includes("constraint")){
                    if (error.response.data?.message.includes("UK_username")){
                        setError({username: "El username ya existe!"})
                    }
                    if (error.response.data?.message.includes("UK_email")){
                        setError({username: "El email ya existe!"})
                    }
            }
            else {
                throw error 
            }
        }
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
                deleteUser(id)
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
        errors,
        setVisibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerSelectUser,
        getUsers
    }
}