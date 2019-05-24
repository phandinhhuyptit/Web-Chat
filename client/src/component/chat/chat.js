import React, { Component } from 'react';
import './chat.css';
import io from 'socket.io-client';
import { USER_CONNECTED} from '../../Contants/chatContats';
import { withRouter,Link } from 'react-router-dom';
import Messages from './message/messages';
import { connect } from 'react-redux'
import MessageInput from './MessageInput/messageInput';
import {logOut} from '../../Actions/authActions';
import PropTypes from 'prop-types';



const socketUrl = "http://localhost:5000"
class chat extends Component {
    constructor(props) {
        super(props);
        this.state = {

            socket: null,
            user: null,
            messages: [],
            usersOnline:[]            

        }
    }
    static propTypes = {

        isAuthenticated :  PropTypes.bool.isRequired,
        user : PropTypes.object.isRequired,
        error: PropTypes.object.isRequired,
    }

    componentWillMount = () => {

        this.initSocket();     
         

    }

    // setActiveChat = (activeChat) => {
    //     this.setState({ activeChat })
    // }

    initSocket = () => {
        const socket = io(socketUrl);
        socket.on('connect', () => {
            console.log('Connected');
        })
        socket.on('newMessage', (response) => {this.newMessage(response)});
        socket.on('updateUesrList', (response) => response ?   this.setState((prevState)=> ({usersOnline: response})) :'' )
        this.setState({ socket });      
        
    }
    newMessage=(msg) =>{
        // const {user} = this.props
        const messages = this.state.messages;
        messages.push({

            id: msg.id,
            msg : msg.data.message,
            userName :msg.data.userName,
            userId :   msg.data.userId
        })
        this.setState({ messages })
    }
 

    setUser = (user) => {
        const { socket } = this.state;
        socket.emit(USER_CONNECTED, user);
        this.setState({ user: user })
    }
    onLogOut = () =>{

        const {onLogOut} = this.props;
        const { socket } = this.state;
        socket.emit('disconnect');
        onLogOut();
        return this.props.history.push("/SignIn");
    }


    // logOut = () => {
    //     const { socket } = this.state
    //     socket.emit(LOGOUT)
    //     this.setState({ user: null })
    // }

    // sendMessage = (chatId , message)=>{
    //     const {socket} = this.props;
    //     socket.emit(MESSAGE_SENT,{chatId,message})    

    // }
    // sendTyping = (chatId ,isTyping) =>{
    //      const {socket} = this.state
    //      socket.emit(TYPING,{chatId,isTyping})   
    // }
    // addChat = (chat , reset) =>{
    //     const {socket} = this.state;  
    //     const {chats} =this.state;
    //     const newChats = reset ? [chat] :[...chats,chat]
    //     this.setState({
    //         chats : newChats
    //     })
    //     const messageEvent = `${MESSAGE_RECIEVED} - ${chat-id}`;
    //     const typingEvent = `${TYPING} -${chat-id}`;
    //     socket.on(typingEvent);
    //     socket.on(messageEvent,this.addMessageToChat(chat.id));
    // }
    // addMessageToChat = (chatId) =>{
    //     return message =>{
    //         const {chats} =this.state;
    //         let newChats =chats.map((chat)=>{
    //             if(chat.id ===chatId)
    //                 chat.messages.push(messageEvent)
    //             return chat

    //         })
    //         this.setState({chats : newChats})
    //     }
    // }

    componentDidUpdate = (prevProps) => {
        const { isAuthenticated, user } = this.props;
        if (isAuthenticated !== prevProps.isAuthenticated) {
            // Check for register error

            if (isAuthenticated) {

                this.setUser(user)
            }
        }
    }


    render() {
        const { socket,messages,usersOnline } = this.state
        const {  user} = this.props;
       


        return (
            <div className="container">
                <div className="Acount">
                    <ul>
                        <li> Xin Chào, {user ? user.name :'' }</li>
                        <li  onClick={()=>this.onLogOut()}> LOGOUT</li>
                    </ul>
                </div>
              
                <h3 className=" text-center">Messenger</h3>
                <div className="messaging">
                    <div className="inbox_msg">
                        <div className="inbox_people">
                            <div className="headind_srch">
                                <div className="recent_heading">
                                    <h4>Users Online</h4>
                                </div>
                                <div className="srch_bar">
                                    <div className="stylish-input-group">
                                        <input type="text" className="search-bar" placeholder="Search" />
                                        <span className="input-group-addon">
                                            <button type="button"> <i className="fa fa-search" aria-hidden="true" /> </button>
                                        </span> </div>
                                </div>
                            </div>
                            <div className="inbox_chat">
                                {
                                    usersOnline.map(user =>{


                                        return (

                                            <div className="chat_list active_chat">
                                            <div className="chat_people">                                       
                                                <div className="chat_ib">
                                                    <h5>{user}</h5>                                          
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="mesgs">
                            <div className="msg_history">
                                <Messages user={user} messages ={messages}  socket={socket}/>

                            </div>
                            <MessageInput
                                socket={socket}
                                user = {user}
                             />
                        </div>
                    </div>
                    <p className="text-center top_spac"> Design by <Link  to="https://www.facebook.com/Phan.Bikenz">Phan Đình Huy</Link></p>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        error: state.error
    }
}
 const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onLogOut: () => {
            dispatch(logOut())
        }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(chat))

