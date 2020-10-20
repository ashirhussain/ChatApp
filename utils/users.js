const users=[];

function joinuser(id,username,room){
    const user={id,username,room};
    console.log(user)
    users.push(user);
    return user;
}
function getcurrentuser(id){
    return users.find(user=>user.id===id);
}

function leaveRoom(id){
    const index=users.findIndex(user=>user.id===id)
    if(index!==-1){
        return users.splice(index,1)[0]
    }

}
function getRoomUsers(room){
return users.filter(user=>user.room===room)
}

module.exports={
    joinuser,
    getcurrentuser,
    leaveRoom,
    getRoomUsers
}