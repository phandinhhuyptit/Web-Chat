import React, { Component } from 'react';


class messages extends Component {
    render() {
        const { messages, socket } = this.props;
        const date = new Date();

        return (
            <div>
                {
                    messages.map(message => {

                        if (message.id === socket.id) {

                            return (

                                <div className="incoming_msg">
                                    <div className="received_msg">
                                        <div className="received_withd_msg">

                                            <p>
                                                {
                                                    message.userName

                                                }
                                                <br />
                                                {

                                                    message.msg

                                                }
                                            </p>
                                            <span className="time_date">{`${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}  `}</span>
                                        </div>
                                    </div>
                                </div>

                            )

                        }
                        else {
                            return (


                                <div className="outgoing_msg">
                                    <div className="sent_msg">
                                        <p>
                                            {
                                                message.userName

                                            }
                                            <br />

                                            {

                                                message.msg

                                            }

                                        </p>
                                        <span className="time_date">{`${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}  `}</span>
                                    </div>
                                </div>

                            )

                        }
                    })

                }
            </div>

        );
    }
}

export default messages;