import { Chat, User } from '../../interfaces/Interface';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: ${({ isUser }: { isUser: boolean }) =>
    isUser ? 'flex-end' : 'flex-start'};
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;
const ChatWrapper = styled.div`
  display: flex;
  gap: 4px;
  justify-content: ${({ isUser }: { isUser: boolean }) =>
    isUser ? 'flex-end' : 'flex-start'};
`;

const CurrentTime = styled.div`
  font-size: 10px;
  display: flex;
  align-items: flex-end;
`;
const ChatValue = styled.div`
  background-color: ${({ isUser }: { isUser: boolean }) =>
    isUser ? '#ECECEC' : 'white'};
  padding: 10px;
  border-radius: 10px;
  word-break: break-all;
  max-width: 75%;
`;
const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  object-fit: cover;
`;

interface ChatItemProps {
  chat: Chat;
  isUser: boolean;
  sender: User;
}

function ChatItem({ chat, isUser, sender }: ChatItemProps) {
  const hour = () => {  if(new Date(chat.date).getHours() < 12) {
    return  '오전 ' + String(new Date(chat.date).getHours());
  }
  else{
    return '오후 ' + String(new Date(chat.date).getHours() - 12);
  }}
  const minute = String(new Date(chat.date).getMinutes()).padStart(2, '0');
  return (
    <Wrapper isUser={isUser}>
      {isUser ? (
        <>
          <ChatWrapper isUser={isUser}>
            <CurrentTime>{hour()}:{minute}</CurrentTime>
            <ChatValue isUser={true}>{chat.text}</ChatValue>
          </ChatWrapper>
        </>
      ) : (
        <>
          <Image src={sender.image}></Image>
          <ContentWrapper>
            {sender.name}
            <ChatWrapper isUser={isUser}>
              <ChatValue isUser={false}>{chat.text}</ChatValue>
              <CurrentTime>{hour()}:{minute}</CurrentTime>
            </ChatWrapper>
          </ContentWrapper>
        </>
      )}
    </Wrapper>
  );
}

export default ChatItem;
