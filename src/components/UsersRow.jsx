import { useContext } from "react"
import { UserContext } from "../context/UserContext"

export const UsersRow = ({ id, username, email }) => {

    const { handlerRemoveUser, handlerSelectUser } = useContext(UserContext)

    return (
        <tr>
            {/* <td>{id}</td> */}
            <td>{username}</td>
            <td>{email}</td>
            <td>
                <div className="btn-group btn-group-horizontal" role="group">
                    <button
                        type="button"
                        className="btn btn-success btn-sm"
                        onClick={() => handlerSelectUser({
                            id,
                            username,
                            email,
                        })}
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handlerRemoveUser(id)}
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    )
}