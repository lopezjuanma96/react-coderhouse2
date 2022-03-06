import "./UserContainer.css"
import { UserContext } from "../utils/UserContext"
import { useContext } from 'react';
import { UserLoginForm } from "./UserLoginForm";
import { UserHub } from "./UserHub";

export const UserContainer = () => {

    const {isLoggedIn, getUserName, setUserName, setUserPassword, attemptLogin, logout} = useContext(UserContext);

    return(
        isLoggedIn
        ? <UserHub getUserName={getUserName} logout={logout}/>
        : <UserLoginForm setUserName={setUserName} setUserPassword={setUserPassword} attemptLogin={attemptLogin}/>
    )
}

