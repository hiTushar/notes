import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar, Home, AddNote, Note, NoteList, Settings } from './Components';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/add' element={<AddNote />} />
              <Route path='/notes/:id' element={<Note />} />
              <Route path='/notes' element={<NoteList />} />
              <Route path='/settings' element={<Settings />} />
          </Routes>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
