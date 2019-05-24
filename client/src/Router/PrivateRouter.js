import React from 'react';
import { Redirect, Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';



const PrivateRoute = ({ component: Component, ...rest }) => {


    return <Route
        {...rest}
        render={props => {           
            return localStorage.getItem("token") ? (

                rest.path === '/SignUp' || rest.path === '/SignIn' ? (<Redirect to={{ pathname: '/Chat', state: { from: props.location } }} />) : (<Component {...props} />)
            ) : (
                    rest.path === "/" ? (<Redirect to={{ pathname: '/SignIn', state: { from: props.location } }} />) : (<Component {...props} />)

                )
        }
        }
    />
}
const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.stateAuth
    }
}
export default withRouter(connect(mapStateToProps)(PrivateRoute));