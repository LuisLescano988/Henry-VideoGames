import './App.css';
import {Route, Routes} from 'react-router-dom';
import LandingPage from './Components/LandingPage'
import Main from './Components/Main'
import Details from './Components/Details';
import NewGame from './Components/NewGame'

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/main' element={<Main/>} />
      <Route path = '/videogames/:id' element = {<Details/>}/>
      <Route path = '/videogames' element = {<NewGame/>}/>
      Henry Videogames
      </Routes>
      
    </div>
  );
}

export default App;
