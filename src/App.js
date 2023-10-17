import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar, Home, AddNote, Note, Settings } from './Components';
import { useSelector } from 'react-redux';
import EditNote from './Components/EditNote/EditNote';

function App() {
  const navbar = useSelector(state => state.navbar);
  
  const getFlexDirection = () => {
    return navbar === 'top' ? 'column' : 'row';
  }

  const getNavbarStyle = () => {
    const flexDirection = getFlexDirection();
    if(flexDirection === 'row') {
      return { width: '150px', linkFlex: 'column' }
    }
    else if(flexDirection === 'column') {
      return { height: '75px' }
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className={`d-flex flex-${getFlexDirection()}`} style={{ height: '100vh' }}>
          <Navbar navbar={navbar} style={{...getNavbarStyle()}} />
          <div className='flex-grow-1 p-5' style={{ height: '100vh', overflow: 'scroll' }}>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/add' element={<AddNote />} />
                <Route path='/edit/:noteId' element={<EditNote />} />
                <Route path='/notes/:id' element={<Note />} />
                <Route path='/settings' element={<Settings />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
