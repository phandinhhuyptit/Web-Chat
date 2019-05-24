
import * as authCotants from '../Contants/authCotants'
import * as loadContant from '../Contants/loadContant';
import { returnErrors, clearErrors } from './errorActions';
import axios from 'axios';

export const handleGettUsers = () => {

    return (dispatch) => {
        dispatch(setItemsLoading());
        axios.get('http://localhost:5000/api/auth')
            .then(res => {
                console.log(res)
                dispatch(getUsers(res.data))
            })

    }
}

export const getUserFail = () => {

    return {

        type: authCotants.getUserFail

    }
}
export const getUsers = (users) => {

    return {

        type: authCotants.getUsers,
        payload: users

    }
}
export const setItemsLoading = () => {
    return {

        type: loadContant.setItemsLoading,
        isLoad: true
    }
}
// Check Token & Load User

export const loadUser = () => (dispatch, getState) => {

    // User loading 
    dispatch({ type: authCotants.userLoadding });


    axios.get('http://localhost:5000/api/auth/user', tokenConfig(getState))
        .then(res =>{

            console.log("OKKKK");
            dispatch({
            
                type: authCotants.userLoaded,
                payload: res.data
    
            })
        } )
        .catch(err => {
            console.log(err);
            // dispatch(
            //     returnErrors(err.response.data,err.response.status)
            // )            
            dispatch({

                type: authCotants.authError

            });
        })
}

// Setup config/headers and token
export const tokenConfig = getState => {
    //Get Token from localstorage       
    const token = getState().auth.token;
    console.log(token);
    //Headers 
    const config = {

        headers: {

            "Content-Type":  "application/json"

        }
    }
    // if token , add to Headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config
}
export const register = ({ name, email, password, confirm }) => dispatch => {

    // Headers 
    const config = {

        headers: {

            'Content-Type': 'application/json'
        }
    }
    // Request body 
    const body = JSON.stringify({ name, email, password, confirm })
    axios.post('http://localhost:5000/api/auth/signUp', body, config)
        .then(res =>{

            dispatch({
                type: authCotants.registerSucess,
                payload: res.data
            })
            dispatch(clearErrors())

        }                     
        )
        .catch(err => {
            console.log(err);
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
        })
}
export const logOut = () => dispatch =>{

    dispatch({
        type :authCotants.logoutSucess
    })
}

export const login = ({email , password}) => dispatch =>{
    
    // Headers

    const config = {

        headers: {

            'Content-Type': 'application/json'
        }
    }     
     // Request body 
    const body = JSON.stringify({ email, password });
    axios.post('http://localhost:5000/api/auth/signIn',body,config)
    .then(res =>{

        dispatch({
               type : authCotants.loginSucess,
               payload : res.data           
        })
        dispatch(clearErrors())
    })
    .catch(err =>{

        dispatch({
            type: authCotants.loginFail
        })

        dispatch(
            returnErrors(err.response.data,err.response.status,'LOGIN_FAIL')
        )

    })
}
