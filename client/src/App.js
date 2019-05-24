import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authAction  from './Actions/authActions';
import { BrowserRouter as Router} from "react-router-dom";
import  DirectionalURL   from './Router/DirectionalURL';

class App extends Component {

  componentDidMount = () => {
    this.props.onHandleGettUsers();
    
    this.props.onloadUser();
  }
  render() {    

    return (
      <Router>
          <DirectionalURL/>        
      </Router>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onHandleGettUsers: () => {
      dispatch(authAction.handleGettUsers());
    },
    onloadUser : () =>{

      dispatch(authAction.loadUser());

    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)


