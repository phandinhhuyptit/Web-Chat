import React, { Component } from 'react';
import './scss/signUp.css';
import { connect } from 'react-redux';
import * as authActions from '../../Actions/authActions';
import PropTypes from 'prop-types';
import { withRouter,Link} from 'react-router-dom'

class signUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    msg: null
  }
  static propTypes = {

    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    onregister: PropTypes.func.isRequired
  }

  componentDidUpdate = (prevProps) => {
    const { error } = this.props;
    if (error !== prevProps.error) {

      // Check for register error

      if (error.id === 'REGISTER_FAIL') {

        this.setState({ msg: error.msg.msg })

      }
      else {

        this.setState({ msg: null })

      }
    }
  }
  onChangeInput = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({

      [name]: value

    })
  }

  onSubmit = (event) => {

    event.preventDefault();

    const { name, email, password, confirm } = this.state;

    const newUser = {
      name,
      email,
      password,
      confirm
    }    
    this.props.onregister(newUser);

    setTimeout(()=>{

      if(!this.state.msg){

        return this.props.history.push("/SignIn");
      }

    },2000 )    

  }
  render() {

    return (
      <div id="SignUp" >
      <div className="container">
        <div className="signup-content">
          <form method="POST" id="signup-form" className="signup-form">
            <h2 className="form-title">Create account</h2>
            {
              this.state.msg ? <p className="errorRegister" >{this.state.msg}</p> : ''
            }
            <div className="form-group">
              <input type="text" onChange={(e) => this.onChangeInput(e)} className="form-input" name="name" id="name" placeholder="Your Name" />
            </div>
            <div className="form-group">
              <input type="email" onChange={(e) => this.onChangeInput(e)} className="form-input" name="email" id="email" placeholder="Your Email" />
            </div>
            <div className="form-group">
              <input type="password" onChange={(e) => this.onChangeInput(e)} className="form-input" name="password" id="password" placeholder="Password" />

            </div>
            <div className="form-group">
              <input type="password" onChange={(e) => this.onChangeInput(e)} className="form-input" name="confirm" id="confirm" placeholder="Repeat your password" />
            </div>
            <div className="form-group">
              <input type="submit" onClick={(e) => this.onSubmit(e)} name="submit" id="submit" className="form-submit" defaultValue="Sign up" />
            </div>
          </form >
          <p className="loginhere">
            Have already an account ? <Link to="/SignIn" className="loginhere-link">Login here</Link>
          </p>
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
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onregister: ({ name, email, password, confirm }) => {
      dispatch(authActions.register({ name, email, password, confirm }))
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(signUp));

