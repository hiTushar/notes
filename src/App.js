import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar, Home, AddNote, Note, NoteList, Settings } from './Components';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<AddNote />} />
          <Route path='/notes' element={<NoteList />} />
          <Route path='/notes/:id' element={<Note />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
