import {useState} from 'react';
import {User} from '../../interfaces/Interface'
import styled from 'styled-components';
import ModalPage from './ModalPage';
import userData from '../../jsons/userData.json'; 

const Wrapper = styled.div`
user-select:none;
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

const Text = styled.div`
font-size: 15.5px;
font-weight:800;
margin-bottom:5px;
`;

const SubText = styled.div`
font-size: 13px;
`;

const Content = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`;

const List = styled.div`
display:flex;
:hover{
  background: #E2E2E2;
  cursor: pointer;
}
`;

interface UserListsProps{
    userId: number;
    users: User[];
    isSearch: boolean;
}

function UserLists({userId, users, isSearch}: UserListsProps){
  const [modalOpen,setModalOpen] = useState<boolean>(false);
  const [userIds, setUserIds] = useState(userId);
  const user = userData.users;

  const showModal = (id: number) => {
    setModalOpen(true);
    if(users == user || isSearch){
    setUserIds(id-1);} //friends 용
    else{
    setUserIds(id); //me 용
    }
  }
  
    return(
      <>
        <Wrapper>
        {users.map((user) => (
          <>
            <List onClick={()=>showModal(user.id)} key={user.id}>
            <Circle>
            <Image src = {user.image}></Image>
            </Circle>
            <Content>
            <Text>{user.name}</Text>
            <SubText>{user.contents}</SubText>
            </Content>         
            </List>
            </>
        ))} 
        </Wrapper>
      {modalOpen && <ModalPage users={users[userIds]} setModalOpen={setModalOpen}/>} 
      </>
    );
}

export default UserLists;