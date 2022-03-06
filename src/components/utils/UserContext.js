import {createContext, useState} from 'react'

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {

    const [ userLoginCred, setUserLoginCred ] = useState({user:"", pass:""});
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    const getUserName = () => {
        return userLoginCred.user;
    }

    const setUserName = (_name) => {
        setUserLoginCred({
            ...userLoginCred,
            user: _name,
        })
    }

    const setUserPassword = (_pass) => {
        setUserLoginCred({
            ...userLoginCred,
            pass: _pass,
        })
    }

    const attemptLogin = () => {
        if(userLoginCred.user === "" || userLoginCred.pass === ""){
            console.warn("EMPTY CREDENTIALS FOR LOGIN")
        } else {
            console.log("LOGGING IN WITH");
            console.log(userLoginCred);
            setIsLoggedIn(true);
        }
    }
    
    const logout = () => {
        console.log("LOGGING OUT");
        setUserName("");
        setUserPassword("");
        setIsLoggedIn(false);
    }

    return (
        <UserContext.Provider value = {{userLoginCred, getUserName, setUserName, setUserPassword, isLoggedIn, attemptLogin, logout}}>
            {children}
        </UserContext.Provider>
    )

}