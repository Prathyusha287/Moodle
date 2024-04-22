import FormContainer from "../components/FormContainer";

const Logout = () =>{
    const inlineStyles = {
        color :'rgb(240, 86, 148)',
       margin :'50px'
    };

    return(
        <FormContainer>
           <div   style={inlineStyles}>
           <h1>You are logged out!</h1>
            <div>
                Thank you for using our App. Come back soon!
            </div>


           </div>
           

            
        </FormContainer>
        
    )
}

export default Logout;