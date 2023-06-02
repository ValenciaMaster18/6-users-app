import { useContext } from "react"
import { UsersForm } from "./UsersForm"
import { UserContext } from "../context/UserContext"

export const UserModalForm = () => {

    const {userSelect, setVisibleForm} = useContext(UserContext)

    return (
        <div className="abrir-modal animacion fadeIn">
            <div className="modal" style={{ display: "block" }} tabIndex={-1}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {userSelect.id > 0 ? "Editar" : "Crear"}
                            </h5>
                        </div>
                        <div className="modal-body">
                            <UsersForm
                                userSelect={userSelect}
                                setVisibleForm={setVisibleForm}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}