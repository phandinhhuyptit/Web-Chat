import React, { Component } from 'react';

class MessageInput extends Component {
    
    
    state= {

        message :''

    }
    checkEnter(e) {
        console.log(e)
        if (e.keyCode === 13) {

            this.onSubmit(e)
        }
      }
    onChangeInput = (event) =>{

        const value = event.target.value;
        this.setState({
            message :value            
        })             

    }
    onSubmit = (event) =>{
     const {socket,user} = this.props;
     const {message} =this.state         
     event.preventDefault();
     socket.emit('newMessage',{message:message,userName :user.name,userId : user.id});
     this.setState({        
        message : ''
     })   
    }
    render() {
        const {message} = this.state;
        return (
            <div className="type_msg">
                <div className="input_msg_write">
                    <input type="text" onKeyUp={(e) =>this.checkEnter(e)} onChange={(e)=>this.onChangeInput(e)} value={message} name="message" className="write_msg" placeholder="Type a message" ref="inputMessage" />
                    <button onClick={(e)=>this.onSubmit(e)} disabled={message.length !==0 ? false :true} className={`msg_send_btn ${message.length !== 0 ? '' :'block'} `} type="button"><i class="far fa-paper-plane"></i></button>
                </div>
            </div>
        );
    }
}

export default MessageInput;