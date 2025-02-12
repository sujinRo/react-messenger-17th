import { useCallback, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  height: 20%;
  width: 350px;
  box-sizing: border-box;
`;

const Form = styled.div`
  width: 350px;
  height: 80%;
  display: flex;
  justify-content: center;
`;

const InputForm = styled.textarea`
  font-size: 13px;
  display: flex;
  border: none;
  outline: none;
  resize: none;
  padding: 10px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  word-break: break-all;
`;

const Button = styled.button`
  font-size: 13px;
  background-color: #ececec;
  margin: 5px 5px 5px 265px;
  width: 23%;
  height: 35%;
  border: none;
  border-radius: 15px;
`;

interface ChatInputProps {
  addChat: (text: string) => void;
}

function ChatInput({ addChat }: ChatInputProps) {
  const [value, setValue] = useState('');

  const onChange = useCallback( //useCallback: 특정함수 재사용에 사용 _ component에서 props가 바뀌지 않았으면 virtual dom에 새로 렌더링하지 않고 컴포넌트의 결과물 재사용
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [value]
  );

  const onSubmit = (e?: React.FormEvent) => {
    if (value.trim() === '') {
      e?.preventDefault();
      return;
    }
      e?.preventDefault();
      addChat(value);
      setValue('');
    
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        onSubmit();
        e.preventDefault();
    }
  };

  return (
    <>
      {
        <Wrapper onSubmit={onSubmit}>
          <Form>
          <InputForm
            required
            value={value}
            onChange={onChange}
            onKeyPress={handleEnter}
          />
          </Form>
          <Button>전송</Button>
        </Wrapper>
      }
    </>
  );
}

export default ChatInput;
