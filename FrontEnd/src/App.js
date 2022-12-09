import './App.css';
import NotesListPage from "./Pages/NotesListPage";
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import NotePage from './Pages/NotePage';





function App() {
  return (
    <div className="container dark">
      <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<NotesListPage />}></Route>
        <Route path='/notes/:noteid' element={<NotePage />}></Route>
      </Routes>
      </div>
    </div>
  );
}

export default App;
