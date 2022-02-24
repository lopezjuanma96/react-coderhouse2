export const InvalidPage = ({msg})=>{
    
    return(
        <>
            <h1>La dirección solicitada es inválida</h1>
            {msg? <p>{msg}</p>:<p></p>}
        </>
    );
}