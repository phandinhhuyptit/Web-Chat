import * as authContants from '../Contants/authCotants';
import * as loadContant from '../Contants/loadContant';


const initialAuth = {
    msg : null,
    token : localStorage.getItem('token'),
    isAuthenticated : null,
    isLoading: false,
    user : null,
    userData: [],
}

const authReducer = (state = initialAuth, action) => {
    switch (action.type) {

        case authContants.userLoaded :
        return {
            ...state,
            isLoading : false,
            isAuthenticated : true,
            user : {...action.payload}
        }
        case authContants.userLoadding : 
        return {

            ...state,
            isLoading : true
            
        }
        case loadContant.setItemsLoading:

            return {

                ...state, isLoading: action.isLoad
            }
        case authContants.getUsers:
            return {

                  ...state,
                  userData : action.payload,
                  isLoading : false  
            }
        case authContants.registerSucess :
        return {
            ...state,
            ...action.payload,            
            isLoading : false
        }
        case authContants.loginSucess :

        localStorage.setItem('token',action.payload.token); 
        

        return {

            ...state,
            ...action.payload,
            isAuthenticated : true,
            isLoading : false,           
            user : action.payload.user
        }


        case authContants.authError:
        case authContants.loginFail:
        case authContants.logoutSucess:
        localStorage.removeItem('token');
        return {
            ...state,
            token : null,
            isAuthenticated : false,
            isLoading: false,
            user : null,
        }
        default:
            return state
    }
}
export default authReducer