import { useContext, useState } from "react"
import { UsersForm } from "../components/UsersForm"
import { UserContext } from "../context/UserContext"

export const RegisterPage = () => {

    const {initialUsersForm} = useContext(UserContext)

    const [userSelect, setUserSelect] = useState(initialUsersForm)

    return (
        <div className="container my-4">
            <h4>Registro de usuarios</h4>
            <div className="row">
                <div className="col">
                    <UsersForm userSelect={userSelect}
                    />
                </div>
            </div>
        </div>
    )
}