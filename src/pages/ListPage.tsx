import {useState} from 'react';
import styled from "styled-components";
import MenuBar from "../components/Bar/MenuBar";
import Back from "../components/Bar/Back";
import userData from '../jsons/userData.json';
import UserLists from "../components/ListPage/UserLists";
import {GoSearch} from "react-icons/go"
import {FiX} from 'react-icons/fi'

const Modal = styled.div`
width: 100%;
height: 100%;
`;

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

const Content = styled.div`
background: linear-gradient(#D0F8B7, white, white, white);
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

const SubTitle = styled.div`
display: flex;
margin: 20px 13px;
margin-bottom: 0;
font-size: 19px;
font-weight: 1000;
border-bottom: 2px solid lightgrey;
padding: 5px 5px;
`;

const SearchInput = styled.input`
height: 28px;
border-radius: 30px;
border: 2px solid lightgray;
outline: none;
padding: 0 10px;
outline: none;
`;

const SearchBar = styled.div`
height:40px;
display: flex;
justify-content: center;
align-items: center;
`;

const searchStyle = {
  color: 'white',
  filter: 'drop-shadow(3px 5px 2px rgb(0 0 0 / 0.3))',
  fontSize: '25px',
  cursor: 'pointer',
  marginLeft: '55%'
}

const XStyle = {
  color: 'white',
  filter: 'drop-shadow(3px 5px 2px rgb(0 0 0 / 0.3))',
  fontSize: '28px',
  cursor: 'pointer',
  marginLeft: '3%'
}

function ListPage(){
  const users = userData.users;
  const me = userData.me;
  const userId = 0;
  const [visible, setVisible] = useState<boolean>(true);
  const [content, setContent] = useState("");

  const onClick = () =>{
    setVisible(!visible);
    setContent('');
  }

  const onChange = (e: React.BaseSyntheticEvent | MouseEvent) => {
    setContent(e.target.value);
  }

  const filterFriend = users.filter((p) => {
    return p.name.toLocaleLowerCase().includes(content.toLocaleLowerCase())
  })

    return(
      <Modal>
        <Wrapper>
          <Bar>
          <Back/>
          <h2 style={{fontSize: '20px', fontWeight: 1000,  margin:0, marginLeft:'10px'}}>Profiles</h2>
          <GoSearch style={searchStyle} onClick={onClick}/>
          </Bar>
          <Content>
          {visible?
          <>
          <SubTitle>me</SubTitle>
          <UserLists userId={userId} users={me} isSearch={false}/>
          <SubTitle>friends</SubTitle>
          <UserLists userId={userId} users={users} isSearch={false}/>
          </>
          :
          <>
          <SearchBar>
          <SearchInput type='text' size={35} value={content} onChange={onChange}/>
          <FiX style={XStyle} onClick={onClick}/>
          </SearchBar>
          <SubTitle>Searching...</SubTitle>
          <UserLists userId={userId} users={filterFriend} isSearch={true}/>
          </>
        }
          </Content>
          <MenuBar/>
        </Wrapper>
      </Modal>
    );
}

export default ListPage;