import { NavLink } from "react-router-dom"

export const NavBar = ({ login, handlerLogout }) => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">UsersApp</a>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className={"nav-link"} to={"users"}>
                                Usuarios
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={"nav-link"} to={"/users/register"}>
                                Registrar Usuarios
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNavLogout">
                    <span className="nav-item nav-link text-primary mx-3">
                        Perfil: <b>{login.user?.username}</b>
                    </span>
                    <button
                        onClick={handlerLogout}
                        className="btn btn-outline-warning"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}