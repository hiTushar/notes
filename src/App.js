import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar, Home, AddNote, Note, Settings } from './Components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

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
        <div style={{ display: 'flex', flexDirection: getFlexDirection() }}>
          <div style={{ border: 'solid 1px' }}>
            <Navbar navbar={navbar} style={{...getNavbarStyle()}} />
          </div>
          <div className='flex-grow-1'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/add' element={<AddNote />} />
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
