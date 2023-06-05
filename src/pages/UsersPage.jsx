import { useContext, useEffect } from "react"
import { UserModalForm } from "../components/UserModalForm"
import { UsersList } from "../components/UsersList"
import { UserContext } from "../context/UserContext"

export const UsersPage = () => {

    const {
        users,
        visibleForm,
        setVisibleForm,
        getUsers
    } = useContext(UserContext)

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>
            {visibleForm ?
                <UserModalForm/>
                :
                <div className="container my-4">
                    <h2>UsersApp</h2>
                    <div className="row">
                        <div className="col">
                            {/* <button
                                className="btn btn-primary my-2"
                                type="button"
                                onClick={() => setVisibleForm(true)}
                            >
                                Nuevo usuario
                            </button> */}
                            {users.length == 0 ?
                                <div className="alert alert-warning">El listado de usuarios esta vacio</div>
                                : <UsersList />
                            }

                        </div>
                    </div>
                </div>
            }
        </>
    )
}