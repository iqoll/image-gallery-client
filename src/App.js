import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Images from './pages/Images';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Images/>}/>
          <Route path='/images'element={<Images/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
