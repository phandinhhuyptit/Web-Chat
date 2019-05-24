import * as error from '../Contants/error';


const errorInitialState = {
    msg : {},
    status : null,
    id : null
}
const errorReducer = (state = errorInitialState, action) => {
    switch (action.type) {
        case error.getError:
            return {

                ...state,
                msg : action.payload.msg,
                status : action.payload.status,
                id : action.payload.id
            }
        case error.clearError:
            return {

                ...state,
                msg : {},
                status : null,
                id : null

            }
        default:
            return state
    }
}
export default errorReducer;