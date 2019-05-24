const  addUser =(userList,user) =>{

    let newList = Object.assign({},userList);
    newList[user.name] = user;
    return newList;
}
const removeUser = (userList,username) =>{
    let newList = Object.assign({},userList);
    delete newList[username];
    return newList;


}
const isUser = (userList,username) =>{

    return username in userList

}

module.exports = {
    addUser,
    removeUser,
    isUser
}