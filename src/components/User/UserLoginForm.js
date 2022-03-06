import "./UserLoginForm.css"

export const UserLoginForm = ({setUserName, setUserPassword, attemptLogin}) => {

    const handleInputChange = (e) => {
        if (e.target.id === "userLoginUserName"){
            setUserName(e.target.value);
        } else if(e.target.id === "userLoginPassword"){
            setUserPassword(e.target.value);
        }
    }

    return(
        <div className="userLoginBlock">
            <form className="userLoginForm">
                <div className="userLoginItem"> 
                    <label className="userLoginLabel"> Usuario </label>
                    <input className="userLoginInput"
                        type="email"
                        placeholder="nombre@mail.com"
                        id="userLoginUserName"
                        name="user"
                        onChange={handleInputChange}
                        />
                </div>
                <div className="userLoginItem">    
                    <label className="userLoginLabel"> Contraseña </label>
                    <input className="userLoginInput"
                        type="password"
                        placeholder="********"
                        id="userLoginPassword"
                        name="pass"
                        onChange={handleInputChange}
                        />
                </div>
                <button className="userLoginSubmitButton" type="submit" onClick={attemptLogin}>INGRESAR</button>
            </form>
        </div>
    )
}