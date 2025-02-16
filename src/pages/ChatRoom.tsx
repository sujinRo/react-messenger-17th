import { useCallback, useEffect, useState } from 'react';
import { Chat } from '../interfaces/Interface';
import chatData from '../jsons/chatData.json';
import userData from '../jsons/userData.json';
import UserList from '../components/ChatRoom/UserList';
import ChatList from '../components/ChatRoom/ChatList';
import styled from 'styled-components';
import ChatInput from '../components/ChatRoom/ChatInput';
import { useParams } from 'react-router-dom';
import {User} from '../interfaces/Interface';

const Wrapper = styled.div`
  font-size: 13px;
  font-family: 'NanumL';
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 100vh;
  box-shadow: rgba(0, 0, 0, 0.15) 0 1px 20px;
  border-radius: 20px;
  margin: 0 auto;
`;

function ChatRoom() {
  const {id} = useParams<string>();
  const roomId: number = parseInt(id!);
  const chatRooms = chatData.chatRooms;
  const curRoom = chatData.chatRooms[roomId];

  const [nextChatId, setNextChatId] = useState<number>(0);
  const [localChats, setLocalChats] = useState<Chat[]>([]);
  const [userId, setUserId] = useState(0);
  
  const users = userData.users;
  const me = userData.me;
  const all = me.concat(users);
  
  useEffect(() => { 
    const localChat = localStorage.getItem(`${roomId}`);
    if(localChat){
      setLocalChats(JSON.parse(localChat));
    }
    else{
      localStorage.setItem(`${roomId}`, JSON.stringify(curRoom.chats)); //localstorage에 고정된 값 넣기!
      setLocalChats(curRoom.chats);
    }

  }, [nextChatId]);

  const addChat = useCallback(
    (text: string) => {
      const chat = {
        id: nextChatId,
        userId: userId,
        text,
        date: String(new Date()),
      };
      
      const prevChats = JSON.parse(localStorage.getItem(`${roomId}`) || '[]');
      const updatedChats = [...prevChats, chat];

      localStorage.setItem(`${roomId}`, JSON.stringify(updatedChats));
      setNextChatId(nextChatId+1);//이렇게 해야 타자를 치자마자 나옴 _ 이유: localstorage에서 getItem을 해오면 한 박자씩 느린데, useState 값은 바로바로 나옴. 그래서, nextChatID를 useEffect의 의존성으로 해주면 채팅이 화면에 바로 나오게됨.
    },
    [nextChatId, userId, roomId] //userId를 해줘야 userId에 따라 분리가 됨
  );

  const getRoomMember=(roomId: number, isCurUser: Boolean)=>{
    const roomMember: User[] = [];
    chatRooms[roomId].users.map((memberId) => roomMember.push(all[memberId]));
    if(!isCurUser){
      roomMember.shift();
    }
    return roomMember;
  }

  const changeUser = (id: number) => {
    setUserId(id);
  };

  return (
    <Wrapper>
      <UserList userId={userId} users={getRoomMember(roomId, true)} changeUser={changeUser} />
      <ChatList userId={userId} users={all} chats={localChats}/>
      <ChatInput addChat={addChat} />
    </Wrapper>
  );
}

export default ChatRoom;
