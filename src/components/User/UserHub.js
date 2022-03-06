import "./UserHub.css"

export const UserHub = ({getUserName, logout}) => {

    return (
        <div className="userHubBlock">
            <h2 className="headerTitle">Datos de {getUserName()}</h2>
            <button className="userLogoutButton" onClick={logout}>SALIR</button>
        </div>
    )
}