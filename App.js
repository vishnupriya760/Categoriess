import logo from './logo.svg';
import './App.css';
import Getalltab from './component/Getalltab';
import Datasform from './component/Datasform';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
 import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div >
      <BrowserRouter>
      
        <Routes>
       <Route path='/Getalltab' element={<Getalltab/>}/>
   <Route path='/Datasform' element={<Datasform />}/>
   </Routes>
     
     </BrowserRouter>
    </div>
  );
}

export default App;
