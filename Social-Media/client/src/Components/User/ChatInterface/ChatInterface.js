import React,{useEffect, useState, useRef} from "react";
import {useSelector} from 'react-redux'
import { userChats } from "../../../Apis/chatRequests";
import ChatBox from "./ChatBox";
import Conversation from "./Conversation";
import {io} from 'socket.io-client'



function ChatInterface() {

  const user = useSelector(state =>state.user)
  console.log(user,'message user');


  const [ chats, setChats] = useState([])
  const [currentChat,setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [recieveMessage, setRecieveMessage] = useState(null)
  const socket = useRef()

  //send message to socket server

  useEffect(()=>{

    if(sendMessage !== null){
      socket.current.emit('send-message', sendMessage)
    }
  },[sendMessage])  

  
  useEffect(()=>{
    socket.current = io('http://localhost:8800');
    socket.current.emit("new-user-add", user._id)
    socket.current.on('get-users', (users)=>{
      setOnlineUsers(users);
    })
  },[user])

  //recieve message from socket server

  useEffect(()=>{
    socket.current.on("receive-message", (data)=>{
      setRecieveMessage(data)
    })
  },[])

  useEffect(() => {

    const getChats = async()=>{
      try {
        const {data} = await userChats(user._id)
        setChats(data)
        console.log(data,'current user chat');
      } catch (error) {
        console.log(error);
      }
    }
    getChats()
  },[user]);
  

const checkOnlineStatus = (chat)=>{
  const chatMember = chat.members.find((member)=> member!==user._id)
  const online = onlineUsers.find((user)=> user.userId === chatMember)
  return online ? true : false
}

  return (
    <div className="lg:ml-20 mt-20 md:mt-0 bg-[#FFFFFF] shadow-md  w-full md:w-11/12 lg:w-3/4 ">
    <div class="container mx-auto">
      <div class="min-w-full border rounded md:grid md:grid-cols-3 h-screen">
        <div class="border-r border-gray-300 md:col-span-1 ">
          <div class="mx-3 my-3">
            <div class="relative text-gray-600">
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  viewBox="0 0 24 24" class="w-6 h-6 text-gray-300">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input type="search" class="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
                placeholder="Search" required />
            </div>
          </div>

          <ul class="overflow-auto h-[32rem]">
            <h2 class="my-2 mb-2 ml-4 text-lg text-gray-600 ">Chats</h2>
            <li>
              {chats.map((chat)=>(
                  <div onClick={()=>setCurrentChat(chat)}>

                    <Conversation data={chat} currentUserId={user._id} online = {checkOnlineStatus(chat)}/>
                  </div>
              ))}

            </li>
          </ul>
        </div>


                <ChatBox chat ={currentChat} currentUser={user._id} setSendMessage={setSendMessage} recieveMessage={recieveMessage}/>

      </div>
    </div>
    </div>
  )
}

export default ChatInterface;
