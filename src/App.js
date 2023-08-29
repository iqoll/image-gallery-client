import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Images from './pages/Images';
import Add from './pages/Add';
import Update from './pages/Update';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Images/>}/>
          <Route path='/images'element={<Images/>}/>
          <Route path='/add'element={<Add/>}/>
          <Route path='/update/:id'element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
