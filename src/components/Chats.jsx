import React, { useEffect, useState, useContext, memo } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext, ChatContext } from "../context";

 const Chats = memo(() => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext)
  const [select, setSelect] = useState(null)
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
    
  }, [currentUser.uid]);
  const handleSelect = (user, index) => {
    dispatch({type: "CHANGE_USER", payload: user})
    setSelect(index)
  }
  return (
    <div className="chats">
      {chats&&Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat, index) => (
        <div 
          className="userChat" 
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo, index)}
          style={select === index ? {backgroundColor: '#2f2d52'}:{}}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
})
export default Chats