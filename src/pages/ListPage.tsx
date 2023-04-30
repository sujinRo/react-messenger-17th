import styled from "styled-components";
import MenuBar from "../components/MenuBar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 100vh;
  background: linear-gradient(#D0F8B7, white, white, #D0F8B7);
  box-shadow: rgba(0, 0, 0, 0.15) 0 1px 20px;
  border-radius: 20px;
  margin: 0 auto;
`;

function ListPage(){
    return(
        <Wrapper>
          <h2>Profiles</h2>
          <MenuBar/>
        </Wrapper>
    );
}

export default ListPage;