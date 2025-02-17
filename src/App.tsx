import MainPage from './pages/MainPage';
import ChatRoom from './pages/ChatRoom';
import ChatRooms from './pages/ChatRooms';
import ListPage from './pages/ListPage';
import Setting from './pages/Setting';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path='/Chat' element={<ChatRooms/>} />
        <Route path='/Chat/:id' element={<ChatRoom/>} />
        <Route path='/List' element={<ListPage/>} />
        <Route path='/Setting' element={<Setting/>}/>
      </Routes>
  );
}

export default App;
 