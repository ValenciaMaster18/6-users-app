import { useUsers } from "../hooks/useUsers"
import { UserContext } from "./UserContext"

export const UserProvider = ({ children }) => {

    const {
        users,
        userSelect,
        initialUsersForm,
        visibleForm,
        errors,
        setVisibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerSelectUser,
        getUsers,
    } = useUsers()

    return (
        <UserContext.Provider value={
            {
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
        }>
            {children}
        </UserContext.Provider>
    )
}