import * as error from '../Contants/error';



// Return ERRORS 

export const returnErrors = (msg , status, id )=>{

    return {

        type : error.getError,
        payload : {msg , status,id}


    }
}

// Clear Errors 
export const clearErrors = () =>{

    return {

        type : error.clearError

    }
}

