import styled from "styled-components";
import Back from "../components/Bar/Back";
import MenuBar from "../components/Bar/MenuBar";
import chatData from "../jsons/chatData.json";
import userData from "../jsons/userData.json";
import {SortChat, User} from "../interfaces/Interface";
import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 100vh;
  box-shadow: rgba(0, 0, 0, 0.15) 0 1px 20px;
  background: linear-gradient(#D0F8B7, white, white, white);
  border-radius: 20px;
  margin: 0 auto;
  font-family: 'NanumL';
  user-select:none;
  }
`;

const Bar = styled.div`
display: flex;
background-color: #D0F8B7;
height: 10%;
border-radius: 20px 20px 0 0;
align-items: center;
`;

const Contents =styled.div`
background: linear-gradient(#D0F8B7, white, white, white);
display: flex;
flex-direction: column;
height: 78%;
overflow: auto;
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background: lightgray;
}
`;

const Content = styled.div`
display: flex;
flex-direction: row;
align-items: center;
:hover{
  background: #E2E2E2;
  cursor: pointer;
}
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  object-fit: cover;
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  margin: 10px;
  margin-bottom: 6px;
  margin-top: 6px;
  background-color: white;
  border: 0.01px solid gray;
`;

const Line = styled.hr`
display: flex;
justify-content: center;
border: 0.01px solid lightgrey;
width: 320px;
`;

const All = styled.div`
display: flex;
flex-direction: column;
width: 70%;
`

const Title = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`

const Name = styled.div`
font-size: 15.5px;
font-weight:800;
`;

const Day = styled.div`
margin-left: 5px;
font-size: 10px;
color: gray;
`;

const Text = styled.div`
margin-top: 5px;
font-size: 13px;
`;

function ChatRooms(){
  const chatRooms = chatData.chatRooms;
  const [lastChat, setLastChat] = useState<SortChat[]>(chatData.chatRooms.map((room) => (
    {
      roomId: room.roomId, 
      id: room.chats[room.chats.length - 1].id, 
      userId: room.chats[room.chats.length - 1].userId, 
      text: room.chats[room.chats.length - 1].text, 
      date: room.chats[room.chats.length - 1].date,
    }
  )));
  
  const users = userData.users;
  const me = userData.me;
  const all = me.concat(users);

  useEffect(() => {
    const updatedChat = [...lastChat]
    for(let i = 0; i < chatData.chatRooms.length; i++){
      const localData = localStorage.getItem(`${i}`);
      if(localData){
        const localChat = JSON.parse(localData);
        updatedChat[i] = {
          roomId: lastChat[i].roomId,
          id: localChat[localChat.length - 1].id,
          userId: localChat[localChat.length - 1].userId,
          text: localChat[localChat.length - 1].text,
          date: localChat[localChat.length - 1].date,
        };
        
      } 
    }
    const sortedChat = updatedChat.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setLastChat(sortedChat);
  },[]);

  const getYear = (date: any)=>{
    const year = String(new Date(date).getFullYear());
    return year;
  }

  const getMonth = (date: any)=>{
    const month = String(new Date(date).getMonth() + 1).padStart(2, '0');
    return month;
  }

  const getDay = (date: any)=>{
    const day = String(new Date(date).getDate()).padStart(2, '0');
    return day;
  }

  const getRoomMember=(roomId: number)=>{
    const roomMember: User[] = [];
    chatRooms[roomId].users.map((memberId) => roomMember.push(all[memberId]));

    roomMember.shift();
    
    return roomMember;
  }

    return(
        <Wrapper>
          <Bar>
          <Back/>
          <h2 style={{fontSize: '20px', fontWeight: 1000,  margin:0, marginLeft:'10px'}}>My Chats</h2>
          </Bar>
          <Contents>
            {lastChat.map((chat) => {
              const getSendTIme = () => {
                const date = chat.date

                if(getYear(date) + '-' + getMonth(date) + '-' + getDay(date)  === getYear(String(new Date())) + '-' + getMonth(String(new Date())) + '-' + getDay(String(new Date()))){
                  const hour = () => {  
                    if(new Date(date).getHours() < 12) {
                    return  '오전 ' + String(new Date(date).getHours());
                  }
                  else{
                    return '오후 ' + String(new Date(date).getHours() - 12);
                  }}
                  
                  const minute = String(new Date(date).getMinutes()).padStart(2, '0');
                  return hour() + ':' + minute;
                }
                else if(getYear(date) + '-' + getMonth(date) + '-' + getDay(date) === getYear(String(new Date())) + '-' + getMonth(String(new Date())) + '-' + String((new Date().getDate() - 1)).padStart(2, '0')){
                  return '어제';
                }
                else{
                  return getYear(date) + '-' + getMonth(date) + '-' + getDay(date);
                }
              }
    
              return(
              <Link to = {`/Chat/${chat.roomId}`} style={{textDecoration: 'none', color: 'inherit'}}>
                <Content>
                  {getRoomMember(chat.roomId).map((member) => (
                  <>
                  <Circle>
                  <Image src={member.image}></Image>
                  </Circle>
                  <All>
                  <Title>
                  <Name>
                  {member.name}
                  </Name>
                  <Day>
                  {getSendTIme()}
                  </Day>
                  </Title>
                  <Text>
                  {chat.text}
                  </Text>
                  </All>
                  </>
            ))}
          </Content>
          <Line/>
              </Link>
            )})}
          </Contents>
          <MenuBar/>
        </Wrapper>
    );
}

export default ChatRooms;
