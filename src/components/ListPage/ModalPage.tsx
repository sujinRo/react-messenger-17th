import { useEffect, useRef } from "react";
import { User } from "../../interfaces/Interface";
import styled from "styled-components";

const Background = styled.div`
background-color: rgba(0, 0, 0, 0.4);
height: 100%;
width: 100%;
z-index: 999;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
display: flex;
justify-content: center;
align-items: center;
`;

const Content = styled.div`
height:420px;
width: 300px;
border-radius: 10%;
background: white;
`;

const Image = styled.img`
height: 300px;
width: 300px;
border-radius: 10% 10% 0 0;
`;

const Text = styled.div`
display: flex;
height: 120px;
justify-content: center;
align-items: center;
`;

interface ModalProps{
    users: User;
    setModalOpen: any;
}

function ModalPage({users, setModalOpen}: ModalProps){
    const modalRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => { //컴포넌트 렌더링 후 실행_즉, 모달 외부 클릭 시, 모달 닫힘
        const handler = (event: React.BaseSyntheticEvent | MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) { //modalRef.current.contains(event.target): 모달 창 내부 _ 즉, 외부 누를 시, 창 닫음
                setModalOpen(false);
            }
        };
        document.addEventListener('mousedown', handler); // 마우스 클릭 시, handler 실행
        
        return () => {
            document.removeEventListener('mousedown', handler); //useEffect 재 실행 전 listener 정리
        };
    });

    return(
        <Background>
            <Content ref={modalRef}>
            <Image src={users?.image}></Image>  
            <Text>{users?.contents}</Text>
            </Content>
        </Background>
    );
}

export default ModalPage;