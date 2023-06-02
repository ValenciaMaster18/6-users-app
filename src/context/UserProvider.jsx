import { useUsers } from "../hooks/useUsers"
import { UserContext } from "./UserContext"

export const UserProvider = ({ children }) => {

    const {
        users,
        userSelect,
        initialUsersForm,
        visibleForm,
        setVisibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerSelectUser
    } = useUsers()

    return (
        <UserContext.Provider value={
            {
                users,
                userSelect,
                initialUsersForm,
                visibleForm,
                setVisibleForm,
                handlerAddUser,
                handlerRemoveUser,
                handlerSelectUser
            }
        }>
            {children}
        </UserContext.Provider>
    )
}