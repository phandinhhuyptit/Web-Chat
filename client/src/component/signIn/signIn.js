import React, { Component } from 'react';
import './scss/signIn.css';
import { connect } from 'react-redux';
import { withRouter,Redirect ,Link } from 'react-router-dom';
import {login } from '../../Actions/authActions';
import PropTypes from 'prop-types';


class signIn extends Component {

    state = {
        email : '',
        password : '',
        msg : null
    }

    static propTypes = {

        isAuthenticated :    PropTypes.bool.isRequired,
        onLogin : PropTypes.func.isRequired,
        error: PropTypes.object.isRequired

    }

    onChangeInput = (event) =>{
      

        const value = event.target.value;
        const name = event.target.name;

        this.setState({

           [name] : value 


        })       

    }
    componentDidUpdate = (prevProps) => {
        const { error } = this.props;
        if (error !== prevProps.error) {
    
          // Check for register error
    
          if (error.id === 'LOGIN_FAIL') {
    
            this.setState({ msg: error.msg.msg })
    
          }
          else {
    
            this.setState({ msg: null })
    
          }
        }
      }
      
    onSubmit = (e) =>{

        e.preventDefault();

        const {email , password} = this.state;

        const User = {

            email : email,
            password : password
        }
        this.props.onLogin(User);
       
    }
    render() {
        if(this.props.isAuthenticated){

            return <Redirect to="/"/>
        }

        return (
            <div className="container" id="login">
                <div id="loginbox" className="col-md-4  col-sm-8 ">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="panel-title">Sign In</div>
                            <div style={{ float: 'right', fontSize: '80%', position: 'relative', top: '-10px' }}><Link to="/forgotPassword" >Forgot password?</Link></div>
                        </div>
                        <div style={{ paddingTop: '30px' }} className="panel-body">

                        {
                            this.state.msg ? (
                            <div style={{ display: 'block' }} id="login-alert" className="alert alert-danger col-sm-12">
                                        {
                                            this.state.msg
                                        }

                            </div> )
                            : ''
                        }   
                            <form id="loginform" className="form-horizontal" >
                                <div style={{ marginBottom: '25px' }} className="input-group">
                                    <span className="input-group-addon"><i class="fas fa-user"></i></span>
                                    <input  onChange={(e)=>this.onChangeInput(e)} id="login-username" type="text" className="form-control" name="email"  placeholder="email" />
                                </div>
                                <div style={{ marginBottom: '25px' }} className="input-group">
                                    <span className="input-group-addon"><i class="fas fa-lock"></i></span>
                                    <input  onChange={(e)=>this.onChangeInput(e)} id="login-password" type="password" className="form-control" name="password" placeholder="password" />
                                </div>
                                <div className="input-group">
                                    <div className="checkbox">
                                        <label>
                                            <input id="login-remember" type="checkbox" name="remember" defaultValue={1} /> Remember me
                                        </label>
                                    </div>
                                </div>
                                <div style={{ marginTop: '10px' }} className="form-group">
                                  
                                    <div className="col-sm-12 controls">
                                        <button  onClick={(e)=>this.onSubmit(e)} id="btn-login" href="#" className="btn btn-success">Login</button>
                                        <a id="btn-fblogin" href="https://www.facebook.com/" className="btn btn-primary">Login with Facebook</a>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-12 control">
                                        <div style={{ borderTop: '1px solid#888', paddingTop: '15px', fontSize: '85%' }}>
                                            Don't have an account!
                                       <Link to="/SignUp">

                                                Sign Up Here

                                        </Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error
    }
}
const  mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onLogin: ({email,password}) => {
            dispatch(login({email,password}))
        }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(signIn))