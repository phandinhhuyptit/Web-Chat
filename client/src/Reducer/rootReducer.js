import authReducer from './authReducer';
import errorReducer from './errReducer';
import { combineReducers} from 'redux';


const rootReducer = combineReducers({
    auth : authReducer,
    error : errorReducer
    
})
export default rootReducer;