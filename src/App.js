import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Images from './pages/Images';
import AddModal from './pages/AddModal';
import Update from './pages/Update';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Images/>}/>
          <Route path='/images'element={<Images/>}/>
          <Route path='/update/:id'element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
