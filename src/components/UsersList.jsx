import { useContext } from "react"
import { UsersRow } from "./UsersRow"
import { UserContext } from "../context/UserContext"

export const UsersList = () => {

    const { users = [] } = useContext(UserContext)
    return (
        <table className="table table-hover table-striped">
            <thead>
                <tr>
                    {/* <th>#</th> */}
                    <th>Username</th>
                    <th>Email</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(({ id, username, email }) => (
                        <UsersRow
                            key={id}
                            id={id}
                            username={username}
                            email={email}
                        />
                    ))
                }
            </tbody>
        </table>
    )
}