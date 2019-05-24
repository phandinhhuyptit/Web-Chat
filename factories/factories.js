
const uuid = require('uuidv4');

const createMessage = ({message ="",sender =""} ={}) =>(
    
    {
        id : uuid(),
        time : new Date(Date.now()),
        message,
        sender
        }

)

const getTime = (date) =>{

    return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`;
 

}
const createChat = ({messages : [],name="Community",users :[]} ={}) =>(
    {
        id : uuid(),
        name,
        messages,
        users,
        typingUsers:[]
    }
)

module.exports ={
    createChat,
    createMessage
}