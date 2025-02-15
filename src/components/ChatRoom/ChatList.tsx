import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatItem from './ChatItem';
import { Chat, User } from '../../interfaces/Interface';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 20px;
  height: 70%;
  overflow: auto;
  background: #D0F8B7;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: lightgray;
  }
`;

const DateBox = styled.div<{isSame: boolean}>`
  display: ${(props) => props.isSame? 'none' : 'flex'};
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: black;
  padding: 10px 0;
`

const DateCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
  width: 90px;
  height: 23px;
  border-radius: 15px;
  background: rgba(255,255,255,0.25);
  font-weight: 700;
  color:rgb(65, 65, 65);
`

interface ChatListProps {
  userId: number;
  chats: Chat[];
  users: User[];
}

function ChatList({ userId, chats, users}: ChatListProps) {
  const chatListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatListRef.current?.scrollTo(0, chatListRef.current.scrollHeight);
  }, [chats]);

  return (
    <Wrapper ref={chatListRef}>
      {chats.map((chat) => {
        const isSame =  chat.id !== 0 && chats[chat.id - 1].date !== chat.date

        const getDate = () => {
          const year = String(new Date(chat.date).getFullYear());
          const month = String(new Date(chat.date).getMonth() + 1);
          const day = String(new Date(chat.date).getDate());
          return year+'년 '+month+'월 '+day+'일';
        }    

        return(
        <div>
          <DateBox isSame={isSame}><DateCircle>{getDate()}</DateCircle></DateBox>
          <ChatItem
          key={chat.id}
          isUser={userId === chat.userId}
          chat={chat}
          sender={users[chat.userId]}/>
        </div>)
        })}
    </Wrapper>
  );
}

export default ChatList;
